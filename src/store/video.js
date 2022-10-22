import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

let lastId = 0

const slice = createSlice({
  name: 'groups',
  initialState: {
    video: null,
    videoFrameOpen: false,
  },
  reducers: {
    setVideoFame: (video, action) => {
      video.videoFrameOpen = action.payload
    },
  },
})

export const videoFrameOpen = createSelector(
  (state) => state.entities.video,
  (video) => video.videoFrameOpen
)

export const { setVideoFame } = slice.actions
export default slice.reducer
