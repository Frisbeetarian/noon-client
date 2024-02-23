export default class KeyManagement {
  static masterKey: CryptoKey | null = null
  static encryptedMasterKey: ArrayBuffer | null = null

  static getMasterKey() {
    if (!this.masterKey) {
      throw new Error('Master Key is not available.')
    }
    return this.masterKey
  }

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

    return {
      encryptedMasterKey: this.encryptedMasterKey,
      iv: this.arrayBufferToBase64(iv),
      salt: this.arrayBufferToBase64(salt),
    }
  }

  static async storeEncryptedKEK(
    encryptedKEKDetails,
    iv,
    salt,
    fromLogin = false
  ) {
    const dbPromise = this.openDatabase()
    const db = await dbPromise
    // @ts-ignore
    const tx = db.transaction('keys', 'readwrite')
    const store = tx.objectStore('keys')

    await store.put({
      id: 'encryptedMasterKey',
      encryptedMasterKey: encryptedKEKDetails,
      iv: iv,
      salt: salt,
    })

    await tx.complete

    // @ts-ignore
    db.close()
  }

  static async decryptAndSetMasterKey(
    encryptedMKDetails: {
      encryptedMasterKey: ArrayBuffer
      iv: string
      salt: string
    },
    password: string
  ) {
    try {
      console.log('iv in decrypt master key:', encryptedMKDetails.iv)
      const enc = new TextEncoder()
      const keyMaterial = await window.crypto.subtle.importKey(
        'raw',
        enc.encode(password),
        'PBKDF2',
        false,
        ['deriveBits', 'deriveKey']
      )

      const kek = await window.crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          // @ts-ignore
          salt: encryptedMKDetails.salt,
          iterations: 100000,
          hash: 'SHA-256',
        },
        keyMaterial,
        { name: 'AES-GCM', length: 256 },
        false,
        ['decrypt']
      )

      const decryptedMK = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          // @ts-ignore
          iv: encryptedMKDetails.iv,
        },
        kek,
        encryptedMKDetails.encryptedMasterKey
      )

      this.masterKey = await window.crypto.subtle.importKey(
        'raw',
        decryptedMK,
        { name: 'AES-GCM', length: 256 },
        true,
        ['encrypt', 'decrypt']
      )
    } catch (error) {
      console.log('Error:', error)
      throw error
    }
  }

  static async fetchEncryptedKEKDetails() {
    const dbPromise = this.openDatabase()
    const db = await dbPromise

    return new Promise((resolve, reject) => {
      // @ts-ignore
      const transaction = db.transaction('keys', 'readonly')
      const store = transaction.objectStore('keys')
      const request = store.get('encryptedMasterKey')

      request.onerror = () => reject(request.error)
      request.onsuccess = () => {
        if (request.result) {
          resolve(request.result)
        } else {
          reject(new Error('No encrypted KEK details found.'))
        }
      }
    })
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
        true,
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
      const exported = await window.crypto.subtle.exportKey('spki', key)
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
    const binaryString = window.atob(base64)

    const len = binaryString.length
    const bytes = new Uint8Array(len)
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i)
    }
    return bytes.buffer
  }

  static async encryptPrivateKey(privateKey: CryptoKey) {
    if (!this.masterKey) {
      throw new Error('Master Key is not set.')
    }

    console.log('private key before encryption:', privateKey)
    const exportedPrivateKey = await window.crypto.subtle.exportKey(
      'pkcs8',
      privateKey
    )

    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encryptedPrivateKey = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      this.masterKey,
      exportedPrivateKey
    )

    return {
      encryptedPrivateKey: this.arrayBufferToBase64(encryptedPrivateKey),
      iv: this.arrayBufferToBase64(iv),
    }
  }

  static async fetchEncryptedPrivateKeyDetails(dontCheckForMasterKey = false) {
    if (!dontCheckForMasterKey && !this.getMasterKey()) {
      throw new Error('Master Key is not set.')
    }

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

  static async exportEncryptedPrivateKey() {
    try {
      // @ts-ignore
      const { encryptedPrivateKey } =
        await this.fetchEncryptedPrivateKeyDetails()
      return { encryptedPrivateKey }
    } catch (error) {
      console.error('Error exporting encrypted private key:', error)
      throw error
    }
  }

  static downloadEncryptedPrivateKey(
    encryptedPrivateKey,
    encryptedMasterKey,
    filename = 'noon-encrypted-data.txt'
  ) {
    const keys = {
      encryptedPrivateKey: encryptedPrivateKey,
      encryptedMasterKey: encryptedMasterKey,
    }

    const blob = new Blob([JSON.stringify(keys)], {
      type: 'text/plain',
    })
    const href = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = href
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(href)
  }

  static async storeEncryptedKey(encryptedKeyData) {
    console.log('iv in store encrypted key:', encryptedKeyData.iv)

    const dbPromise = this.openDatabase()
    const db: any = await dbPromise

    const tx = db.transaction('keys', 'readwrite')
    const store = tx.objectStore('keys')
    await store.put({
      id: 'userPrivateKey',
      encryptedPrivateKey: encryptedKeyData.encryptedPrivateKey,
      iv: encryptedKeyData.iv,
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
    encryptedPrivateKeyBase64: any,
    ivBase64: any
  ) {
    try {
      if (!this.getMasterKey()) {
        throw new Error('Master Key is not set.')
      }

      const encryptedPrivateKey = this.base64ToArrayBuffer(
        encryptedPrivateKeyBase64
      )
      const iv = this.base64ToArrayBuffer(ivBase64)

      const decryptedPrivateKeyArrayBuffer = await window.crypto.subtle.decrypt(
        {
          name: 'AES-GCM',
          iv: iv,
        },
        this.getMasterKey(),
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
    } catch (error) {
      console.error('Error decrypting private key:', error)
      throw error
    }
  }

  static async clearIndexedDBData() {
    const dbRequest = indexedDB.open('noon-db')

    dbRequest.onsuccess = function (event) {
      // @ts-ignore
      const db = event.target.result

      const transaction = db.transaction(['keys'], 'readwrite')

      transaction.onerror = function (event) {
        console.error('Transaction error:', event.target.error)
      }

      const storesToClear = ['keys']
      storesToClear.forEach((storeName) => {
        const clearRequest = transaction.objectStore(storeName).clear()

        clearRequest.onsuccess = function () {
          console.log(`${storeName} store cleared.`)
        }

        clearRequest.onerror = function (event) {
          console.error(
            `Error clearing ${storeName} store:`,
            event.target.error
          )
        }
      })

      transaction.oncomplete = function () {
        console.log('All specified stores cleared.')
      }
    }

    dbRequest.onerror = function (event) {
      // @ts-ignore
      console.error('Error opening database:', event.target.error)
    }
  }

  static clearMemoryData() {
    this.masterKey = null
    this.encryptedMasterKey = null
  }
}
