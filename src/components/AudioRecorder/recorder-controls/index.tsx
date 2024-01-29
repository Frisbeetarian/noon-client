import { formatMinutes, formatSeconds } from '../../../utils/formatTime'
import { RecorderControlsProps } from '../types/recorder'
import { Button, Flex, Icon } from '@chakra-ui/react'
import { ImMic, ImArrowRight, ImCancelCircle } from 'react-icons/im'
import { useSelector } from 'react-redux'
import { getIsMobile } from '../../../store/ui'
import AppButton from '../../AppComponents/AppButton'

export default function RecorderControls({
  recorderState,
  handlers,
}: RecorderControlsProps) {
  const { recordingMinutes, recordingSeconds, initRecording } = recorderState
  const { startRecording, saveRecording, cancelRecording } = handlers
  const isMobile = useSelector(getIsMobile)

  return (
    <Flex className="items-center rounded  relative z-20">
      <Flex className="items-center py-0">
        {initRecording && (
          <Flex className="">
            <Flex className="">
              <button
                className="mb-1 p-2 cursor-pointer text-red-500 hover:text-red-500"
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
          </Flex>
        )}
      </Flex>

      <Flex className="items-center">
        {initRecording ? (
          <button
            className="text-green-600"
            title="Save recording"
            disabled={recordingSeconds === 0}
            onClick={saveRecording}
          >
            {/* <FontAwesomeIcon icon={faSave} size="2x" /> */}
            <Icon as={ImArrowRight} />
          </button>
        ) : (
          <AppButton
            size={isMobile ? 'sm' : 'md'}
            title="Start recording"
            onClick={startRecording}
          >
            {/* <FontAwesomeIcon icon={faMicrophone} size="2x" /> */}
            <Icon as={ImMic} />
          </AppButton>
        )}
      </Flex>
    </Flex>
  )
}
