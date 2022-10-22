import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

let lastId = 0

const slice = createSlice({
  name: 'groups',
  initialState: {
    videoFrameOpen: false,
  },
  reducers: {
    setVideoFrameForConversation: (video, action) => {
      video.videoFrameOpen = action.payload
    },
  },
})

export const getVideoFrameOpenState = createSelector(
  (state) => state.entities.video,
  (video) => video.videoFrameOpen
)

export const { setVideoFrameForConversation } = slice.actions
export default slice.reducer
