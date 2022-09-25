import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import { useUploadImageMutation } from '../../generated/graphql'
import { getLoggedInUser } from '../../store/users'
import { getActiveConversation } from '../../store/chat'
import axios from 'axios'
import FormData from 'form-data'
import { uuid } from 'uuidv4'

export const FileUpload = ({ children }) => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(getLoggedInUser)
  const activeConversation = useSelector(getActiveConversation)

  const { acceptedFiles, getRootProps } = useDropzone()
  const [, uploadImage] = useUploadImageMutation()

  //   const onDrop = useCallback(
  //     (acceptedFiles) => {
  //       console.log(acceptedFiles)

  //       acceptedFiles.forEach((file) => {
  //         const reader = new FileReader()
  //         console.log(file)

  //         reader.onabort = () => console.log('file reading was aborted')
  //         reader.onerror = () => console.log('file reading has failed')
  //         reader.onload = () => {
  //           // Do whatever you want with the file contents
  //           const binaryStr = reader.result
  //           console.log(binaryStr)
  //         }
  //         reader.readAsArrayBuffer(file)
  //       })
  //     },
  //     [acceptedFiles]
  //   )

  useEffect(() => {
    console.log('accepted files:', acceptedFiles)

    if (acceptedFiles.length !== 0) {
      let file = acceptedFiles[0]
      let formData = new FormData()
      formData.append('file', file, 'file')
      formData.append('conversationUuid', activeConversation.uuid)
      formData.append('messageUuid', uuid())
      formData.append('senderUuid', loggedInUser.user?.profile?.uuid)

      //   axios.post('http://localhost:4020/media_api/upload_image', {
      //     body: formData,
      //   })

      axios
        .post('http://localhost:4020/media_api/upload_image', formData, {
          headers: {
            accept: 'application/json',
            'Accept-Language': 'en-US,en;q=0.8',
            'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          },
        })
        .then((response) => {
          //handle success
          console.log('response from upload image:', response)
        })
        .catch((error) => {
          //handle error
        })

      //   const reader = new FileReader()
      //   reader.readAsBinaryString(file)

      //   reader.onabort = () => console.log('file reading was aborted')
      //   reader.onerror = () => console.log('file reading has failed')

      //   reader.onload = () => {
      //     // Do whatever you want with the file contents
      //     const binaryStr = reader.result
      //     console.log('binary string:', binaryStr)

      //     uploadImage({
      //       profileUuid: loggedInUser.user?.profile?.uuid,
      //       conversationUuid: activeConversation.uuid,
      //       file: binaryStr,
      //     })
      //   }
    }
  }, [acceptedFiles])

  //   const files = acceptedFiles.map(async (file) => {
  //     const reader = new FileReader()
  //     reader.readAsArrayBuffer(file)

  //     reader.onabort = () => console.log('file reading was aborted')
  //     reader.onerror = () => console.log('file reading has failed')

  //     reader.onload = () => {
  //       // Do whatever you want with the file contents
  //       const binaryStr = reader.result
  //       console.log(binaryStr)

  //       uploadImage({
  //         profileUuid: loggedInUser.user?.profile?.uuid,
  //         conversationUuid: activeConversation.uuid,
  //         file: binaryStr,
  //       })
  //     }

  //     // fr.addEventListener('loadend', loaded)
  //     // console.log(ll)
  //     //   <li key={file.path}>
  //     // {file.path} - {file.size} bytes
  //     //   </li>
  //   })

  return (
    <div {...getRootProps({ className: 'dropzone' })}>
      {children}

      <aside>
        <h4>Files</h4>
        {/* <ul>{files}</ul> */}
      </aside>
    </div>
  )
}
