// @ts-nocheck
import { useSelector } from 'react-redux'
import { Flex, Icon } from '@chakra-ui/react'
import { ImMic, ImArrowRight, ImCancelCircle } from 'react-icons/im'

import { formatMinutes, formatSeconds } from '../../../utils/formatTime'
import { RecorderControlsProps } from '../types/recorder'
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
    <Flex className="items-center rounded relative z-20 ">
      <Flex className="items-center py-0 ">
        {initRecording && (
          <Flex className="items-center border px-2 border-red-500 rounded-none">
            <Flex className="">
              <button
                className="mb-1 p-2 cursor-pointer text-red-500 hover:text-red-500"
                title="Cancel recording"
                onClick={cancelRecording}
              >
                <Icon as={ImCancelCircle} />
              </button>
            </Flex>

            <Flex className="mx-2 items-center text-lg bg-red-500 rounded p-1 px-2 h-8 rounded-none">
              {/*{initRecording && <div className="recording-indicator"></div>}*/}
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
            className="text-red-500 ml-2"
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
