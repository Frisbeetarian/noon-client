import KeyManagement from './KeyManagement'

export default class MessageManagement {
  static async generateSymmetricKey() {
    return window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )
  }

  static generateIV() {
    return window.crypto.getRandomValues(new Uint8Array(12))
  }

  static async encryptMessage(publicKeys, message) {
    const symmetricKey = await this.generateSymmetricKey()
    const iv = this.generateIV()
    const encodedMessage = new TextEncoder().encode(message)

    const encryptedMessage = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      symmetricKey,
      encodedMessage
    )
    const encryptedKeys = []

    for (const key of publicKeys) {
      const exportedSymmetricKey = await window.crypto.subtle.exportKey(
        'raw',
        symmetricKey
      )

      const publicKey = await KeyManagement.importPublicKey(key.publicKey)
      const encryptedKey = await window.crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        publicKey,
        exportedSymmetricKey
      )
      // @ts-ignore
      encryptedKeys.push({
        uuid: key.uuid,
        key: KeyManagement.arrayBufferToBase64(encryptedKey),
      })
    }

    const combinedEncryptedMessage = new Uint8Array(
      iv.length + encryptedMessage.byteLength
    )
    combinedEncryptedMessage.set(iv, 0)
    combinedEncryptedMessage.set(new Uint8Array(encryptedMessage), iv.length)

    return {
      encryptedMessage: KeyManagement.arrayBufferToBase64(
        combinedEncryptedMessage
      ),
      encryptedKeys,
    }
  }

  static async decryptMessage(
    encryptedMessageBase64,
    encryptedKeyBase64,
    userUuid
  ) {
    // @ts-ignore
    const { encryptedPrivateKey, iv: ivForPrivateKey } =
      await KeyManagement.fetchEncryptedPrivateKeyDetails(false, userUuid)

    const privateKey = await KeyManagement.decryptPrivateKey(
      encryptedPrivateKey,
      ivForPrivateKey
    )

    const encryptedKey = KeyManagement.base64ToArrayBuffer(encryptedKeyBase64)

    const symmetricKeyArrayBuffer = await window.crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      privateKey,
      encryptedKey
    )

    const symmetricKey = await window.crypto.subtle.importKey(
      'raw',
      symmetricKeyArrayBuffer,
      { name: 'AES-GCM' },
      true,
      ['decrypt']
    )

    const combinedEncryptedMessage = KeyManagement.base64ToArrayBuffer(
      encryptedMessageBase64
    )
    const ivForMessage = combinedEncryptedMessage.slice(0, 12)
    const actualEncryptedMessage = combinedEncryptedMessage.slice(12)

    const decryptedMessageArrayBuffer = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivForMessage },
      symmetricKey,
      actualEncryptedMessage
    )

    const decoder = new TextDecoder()
    const message = decoder.decode(decryptedMessageArrayBuffer)

    return message
  }
}
