export default class KeyManagement {
  static sessionKey = null
  static masterKey: CryptoKey | null = null
  static encryptedMasterKey: ArrayBuffer | null = null

  static async generateAndEncryptMasterKey(password: string) {
    this.masterKey = await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )

    const enc = new TextEncoder()
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    )
    const salt = window.crypto.getRandomValues(new Uint8Array(16))
    const kek = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )

    const exportedMK = await window.crypto.subtle.exportKey(
      'raw',
      this.masterKey
    )
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    this.encryptedMasterKey = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      kek,
      exportedMK
    )

    // Return encrypted MK details for storage
    return {
      encryptedMasterKey: this.encryptedMasterKey,
      iv: this.arrayBufferToBase64(iv),
      salt: this.arrayBufferToBase64(salt),
    }
  }

  static clearSessionKey() {
    this.sessionKey = null
  }

  static async generateKeyPair() {
    try {
      const keyPair = await window.crypto.subtle.generateKey(
        {
          name: 'RSA-OAEP',
          modulusLength: 2048,
          publicExponent: new Uint8Array([1, 0, 1]),
          hash: { name: 'SHA-256' },
        },
        true, // whether the key is extractable (i.e., can be used in exportKey)
        ['encrypt', 'decrypt']
      )
      return keyPair
    } catch (error) {
      console.error('Error generating key pair:', error)
      throw error
    }
  }

  static async importPublicKey(publicKeyBase64) {
    const publicKeyBuffer = this.base64ToArrayBuffer(publicKeyBase64)

    const publicKey = await window.crypto.subtle.importKey(
      'spki',
      publicKeyBuffer,
      {
        name: 'RSA-OAEP',
        hash: { name: 'SHA-256' },
      },
      true,
      ['encrypt']
    )

    return publicKey
  }

  static async exportPublicKey(key) {
    try {
      const exported = await window.crypto.subtle.exportKey(
        'spki', // Subject Public Key Info format
        key
      )
      return this.arrayBufferToBase64(exported)
    } catch (error) {
      console.error('Error exporting public key:', error)
      throw error
    }
  }

  static arrayBufferToBase64(buffer) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
  }

  static base64ToArrayBuffer(base64) {
    // console.log('base64:', base64)

    const binaryString = window.atob(base64)

    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  static async encryptPrivateKey(privateKey, password) {
    const enc = new TextEncoder()
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    )

    const salt = window.crypto.getRandomValues(new Uint8Array(16))
    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt', 'decrypt']
    )

    const exportedPrivateKey = await window.crypto.subtle.exportKey(
      'pkcs8',
      privateKey
    )

    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encryptedPrivateKey = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      exportedPrivateKey
    )

    return {
      encryptedPrivateKey,
      iv: this.arrayBufferToBase64(iv),
      salt: this.arrayBufferToBase64(salt),
    }
  }

  static async fetchEncryptedPrivateKeyDetails() {
    const dbPromise = this.openDatabase()
    const db = await dbPromise

    return new Promise((resolve, reject) => {
      // @ts-ignore
      const transaction = db.transaction('keys', 'readonly')
      const store = transaction.objectStore('keys')
      const request = store.get('userPrivateKey')

      request.onerror = function () {
        reject(request.error)
      }

      request.onsuccess = function () {
        if (request.result) {
          resolve({
            encryptedPrivateKey: request.result.encryptedPrivateKey,
            iv: request.result.iv,
            salt: request.result.salt,
          })
        } else {
          reject(new Error('No encrypted private key details found.'))
        }
      }
    })
  }

  static async storeEncryptedKey(encryptedKeyData) {
    const dbPromise = this.openDatabase()
    const db: any = await dbPromise

    const tx = db.transaction('keys', 'readwrite')
    const store = tx.objectStore('keys')
    await store.put({
      id: 'userPrivateKey',
      encryptedPrivateKey: encryptedKeyData.encryptedPrivateKey,
      iv: encryptedKeyData.iv,
      salt: encryptedKeyData.salt,
    })

    await tx.complete
    db.close()
  }

  static openDatabase() {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open('noon-db', 1)

      request.onerror = () => reject(request.error)
      request.onsuccess = () => resolve(request.result)

      request.onupgradeneeded = (event) => {
        // @ts-ignore
        const db = event.target.result
        if (!db.objectStoreNames.contains('keys')) {
          db.createObjectStore('keys', { keyPath: 'id' })
        }
      }
    })
  }

  static async decryptPrivateKey(
    encryptedPrivateKeyBase64,
    ivBase64,
    saltBase64,
    password
  ) {
    const encryptedPrivateKey = this.base64ToArrayBuffer(
      encryptedPrivateKeyBase64
    )
    const iv = this.base64ToArrayBuffer(ivBase64)
    const salt = this.base64ToArrayBuffer(saltBase64)

    const enc = new TextEncoder()
    const keyMaterial = await window.crypto.subtle.importKey(
      'raw',
      enc.encode(password),
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    )

    const key = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    )

    const decryptedPrivateKeyArrayBuffer = await window.crypto.subtle.decrypt(
      {
        name: 'AES-GCM',
        iv: iv,
      },
      key,
      encryptedPrivateKey
    )

    const privateKey = await window.crypto.subtle.importKey(
      'pkcs8',
      decryptedPrivateKeyArrayBuffer,
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      true,
      ['decrypt']
    )

    return privateKey
  }
}
