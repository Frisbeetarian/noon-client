import KeyManagement from './KeyManagement'

export default class MessageUtility {
  static async encryptMessage(message, publicKeyBase64) {
    const publicKey = await KeyManagement.importPublicKey(publicKeyBase64)
    const encoder = new TextEncoder()
    const encodedMessage = encoder.encode(message)
    const encryptedMessage = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      encodedMessage
    )
    return KeyManagement.arrayBufferToBase64(encryptedMessage)
  }

  static async decryptMessage(encryptedMessageBase64, password) {
    const { encryptedPrivateKey, iv, salt } =
      await KeyManagement.fetchEncryptedPrivateKeyDetails()
    const privateKey = await KeyManagement.decryptPrivateKey(
      encryptedPrivateKey,
      iv,
      salt,
      password
    )
    const encryptedMessage = KeyManagement.base64ToArrayBuffer(
      encryptedMessageBase64
    )
    const decryptedMessage = await window.crypto.subtle.decrypt(
      {
        name: 'RSA-OAEP',
      },
      privateKey,
      encryptedMessage
    )
    // Decode and return the decrypted message
    const decoder = new TextDecoder()
    return decoder.decode(decryptedMessage)
  }
}
