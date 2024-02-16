export default class KeyManagement {
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
    const len = bytes.byteLength
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i])
    }
    return window.btoa(binary)
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

    // Export the private key
    const exportedPrivateKey = await window.crypto.subtle.exportKey(
      'pkcs8',
      privateKey
    )

    // Encrypt the exported private key
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
}
