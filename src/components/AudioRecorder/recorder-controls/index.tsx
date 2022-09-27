// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {
//   faMicrophone,
//   faTimes,
//   faSave,
// } from '@fortawesome/free-solid-svg-icons'
import { formatMinutes, formatSeconds } from '../../../utils/formatTime'
import { RecorderControlsProps } from '../types/recorder'
import { Icon } from '@chakra-ui/react'
import { ImMic, ImArrowRight, ImCancelCircle } from 'react-icons/im'
import { Flex } from '@chakra-ui/react'

export default function RecorderControls({
  recorderState,
  handlers,
}: RecorderControlsProps) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState
  const { startRecording, saveRecording, cancelRecording } = handlers

  return (
    <Flex className="items-center mx-2 bg-blue-300 rounded px-2">
      <Flex className="items-center py-2">
        {initRecording && (
          <>
            <Flex className="">
              <button
                className="mb-1 mx-2"
                title="Cancel recording"
                onClick={cancelRecording}
              >
                {/* <FontAwesomeIcon icon={faTimes} /> */}
                <Icon as={ImCancelCircle} />
              </button>
            </Flex>

            <Flex className="mx-2 items-center text-lg bg-green-300 rounded p-1 px-2">
              {initRecording && <div className="recording-indicator"></div>}
              <span>{formatMinutes(recordingMinutes)}</span>
              <span>:</span>
              <span>{formatSeconds(recordingSeconds)}</span>
            </Flex>
          </>
        )}
      </Flex>

      <Flex className="items-center">
        {initRecording ? (
          <button
            className="mb-1 text-green-600"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            {/* <FontAwesomeIcon icon={faSave} size="2x" /> */}
            <Icon as={ImArrowRight} />
          </button>
        ) : (
          <button
            className="mb-1 mx-2"
            title="Start recording"
            onClick={startRecording}
          >
            {/* <FontAwesomeIcon icon={faMicrophone} size="2x" /> */}
            <Icon as={ImMic} />
          </button>
        )}
      </Flex>
    </Flex>
  )
}
