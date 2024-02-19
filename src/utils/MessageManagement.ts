import KeyManagement from './KeyManagement'

export default class MessageManagement {
  static async encryptMessage(publicKeys, message) {
    const symmetricKey = await window.crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )

    const encodedMessage = new TextEncoder().encode(message)
    const iv = window.crypto.getRandomValues(new Uint8Array(12))
    const encryptedMessage = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      symmetricKey,
      encodedMessage
    )

    const encryptedKeys = new Set()

    for (const key of publicKeys) {
      const publicKey = await KeyManagement.importPublicKey(key.publicKey)
      const exportedSymmetricKey = await window.crypto.subtle.exportKey(
        'raw',
        symmetricKey
      )
      const encryptedKey = await window.crypto.subtle.encrypt(
        { name: 'RSA-OAEP' },
        publicKey,
        exportedSymmetricKey
      )

      encryptedKeys.add({
        uuid: key.uuid,
        key: [KeyManagement.arrayBufferToBase64(encryptedKey)],
      })
    }

    return {
      encryptedMessage: KeyManagement.arrayBufferToBase64(encryptedMessage),
      iv: KeyManagement.arrayBufferToBase64(iv),
      encryptedKeys,
    }
  }

  // static async encryptMessage(publicKeys: any, message: string | undefined) {
  //   // const publicKey = await KeyManagement.importPublicKey(publicKeyBase64)
  //   const encodedMessage = new TextEncoder().encode(message)
  //   let encryptedMessages = []
  //
  //   for (const publicKeyBase64 of publicKeys) {
  //     const publicKey = await KeyManagement.importPublicKey(publicKeyBase64)
  //     const encryptedMessage = await window.crypto.subtle.encrypt(
  //       { name: 'RSA-OAEP' },
  //       publicKey,
  //       encodedMessage
  //     )
  //     encryptedMessages.push(
  //       // @ts-ignore
  //       KeyManagement.arrayBufferToBase64(encryptedMessage)
  //     )
  //   }
  //
  //   return encryptedMessages
  //
  //   // const encryptedMessage = await window.crypto.subtle.encrypt(
  //   //   {
  //   //     name: 'RSA-OAEP',
  //   //   },
  //   //   publicKey,
  //   //   encodedMessage
  //   // )
  //   // return KeyManagement.arrayBufferToBase64(encryptedMessage)
  // }

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
