import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

let lastId = 0

const slice = createSlice({
  name: 'groups',
  initialState: {
    videoFrameOpen: false,
  },
  reducers: {
    setVideoFrame: (video, action) => {
      video.videoFrameOpen = action.payload
    },
  },
})

export const getVideoFrameOpenState = createSelector(
  (state) => state.entities.video,
  (video) => video.videoFrameOpen
)

export const { setVideoFrame } = slice.actions
export default slice.reducer
