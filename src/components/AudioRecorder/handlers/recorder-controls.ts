import { SetRecorder } from '../types/recorder'
import axios from 'axios'
import FormData from 'form-data'
import { v4 as uuid } from 'uuid'
import { ReadStream } from 'fs'

export async function startRecording(setRecorderState: SetRecorder) {
  try {
    const stream: MediaStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })

    setRecorderState((prevState) => {
      return {
        ...prevState,
        initRecording: true,
        mediaStream: stream,
      }
    })
  } catch (err) {
    console.log(err)
  }
}

export async function saveRecording(recorder: any) {
  console.log('recorder:', recorder)
  if (recorder.state !== 'inactive') recorder.stop()
}
