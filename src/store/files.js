import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

const slice = createSlice({
  name: 'files',
  initialState: {
    file: null,
  },
  reducers: {
    uploadFile: (files, action) => {
      files.file = action.payload.file
    },
  },
})

export const getUploadedFile = createSelector(
  (state) => state.entities.files,
  (files) => files.file
)

export const { uploadFile } = slice.actions
export default slice.reducer
