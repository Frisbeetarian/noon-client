import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface VideoState {
  videoFrameOpen: boolean
}

const initialState: VideoState = {
  videoFrameOpen: false,
}

const slice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setVideoFrameForConversation: (video, action: PayloadAction<boolean>) => {
      video.videoFrameOpen = action.payload
    },
    clearVideoState: (_) => {
      return initialState
    },
  },
})

export const getVideoFrameOpenState = createSelector(
  (state) => state.entities.video,
  (video) => video.videoFrameOpen
)

export const { setVideoFrameForConversation, clearVideoState } = slice.actions
export default slice.reducer
