import KeyManagement from './KeyManagement'

export default class MessageManagement {
  static async encryptMessage(
    publicKeyBase64: any,
    message: string | undefined
  ) {
    const publicKey = await KeyManagement.importPublicKey(publicKeyBase64)
    const encodedMessage = new TextEncoder().encode(message)
    const encryptedMessage = await window.crypto.subtle.encrypt(
      {
        name: 'RSA-OAEP',
      },
      publicKey,
      encodedMessage
    )
    return KeyManagement.arrayBufferToBase64(encryptedMessage)
  }

  static async decryptMessage(encryptedMessageBase64) {
    try {
      if (!KeyManagement.getMasterKey()) {
        throw new Error('Master Key is not set.')
      }

      // @ts-ignore
      const { encryptedPrivateKey, iv } =
        await KeyManagement.fetchEncryptedPrivateKeyDetails()

      const privateKey = await KeyManagement.decryptPrivateKey(
        encryptedPrivateKey,
        iv
      )
      console.log('encryptedMessageBase64:', encryptedMessageBase64)

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

      const decoder = new TextDecoder()
      return decoder.decode(decryptedMessage)
    } catch (e) {
      console.error('Error decrypting message:', e)
      throw e
    }
  }
}
