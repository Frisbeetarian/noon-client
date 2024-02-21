import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'

interface FilesState {
  file: null
}

const initialState: FilesState = {
  file: null,
}

const slice = createSlice({
  name: 'files',
  initialState,
  reducers: {
    uploadFile: (files, action) => {
      files.file = action.payload.file
    },
    clearFilesState: (_) => {
      return initialState
    },
  },
})

export const getUploadedFile = createSelector(
  (state) => state.entities.files,
  (files) => files.file
)

export const { uploadFile, clearFilesState } = slice.actions
export default slice.reducer
