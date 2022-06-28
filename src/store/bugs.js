import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect'
import { apiCallBegan } from './api'
import moment from 'moment'
import axios from 'axios'
// const bugUpdated = createAction("bugUpdated");
// let lastId = 0;

const slice = createSlice({
  name: 'bugs',
  initialState: {
    list: [],
    loading: false,
    lastFetch: null,
  },
  reducers: {
    bugsRequested: (bugs, action) => {
      bugs.loading = true
    },
    bugsRequestFailed: (bugs, action) => {
      bugs.loading = false
    },
    bugsReceived: (bugs, action) => {
      bugs.list = action.payload
      bugs.loading = false
      bugs.lastFetch = Date.now()
    },
    bugAdded: (bugs, action) => {
      // bugs.list.push({
      //     id: ++lastId,
      //     description: action.payload.description,
      //     resolved: false
      // })

      bugs.list.push(action.payload)
    },
    bugAssignedToUser: (bugs, action) => {
      const { id: bugId, userId } = action.payload
      const index = bugs.list.findIndex((bug) => bug.id === bugId)
      bugs.list[index].userId = userId
    },
    bugResolved: (bugs, action) => {
      const index = bugs.list.findIndex((bug) => bug.id === action.payload.id)
      bugs.list[index].resolved = true
    },
  },
})

// action types
// const BUG_ADDED = 'bugAdded';
// const BUG_REMOVED = 'bugRemoved';
// const BUG_RESOLVED = 'bugResolved';
export const {
  bugAdded,
  bugResolved,
  bugAssignedToUser,
  bugsReceived,
  bugsRequested,
  bugsRequestFailed,
} = slice.actions
export default slice.reducer

// Action creators
const url = '/bugs'

export const loadBugs = () => (dispatch, getState) => {
  const { lastFetch } = getState().entities.bugs

  const diffInMinutes = moment().diff(moment(lastFetch), 'minutes')

  if (diffInMinutes < 10) return

  return dispatch(
    apiCallBegan({
      url,
      onStart: bugsRequested.type,
      onSuccess: bugsReceived.type,
      onError: bugsRequestFailed.type,
    })
  )
}

// steps: make an api call
// promise resolved => dispatch(success)
// export const addBug = bug => {
//     try{
//         const response = await axios.post(url, bug);
//         dispatch(bugAdded(bug))
//     }catch(error){
//         dispatch({type: 'error'})
//     }
// }

export const addBug = (bug) =>
  apiCallBegan({
    url,
    method: 'post',
    data: bug,
    onSuccess: bugAdded.type,
  })

export const resolveBug = (id) =>
  apiCallBegan({
    url: url + '/' + id,
    method: 'patch',
    data: { resolved: true },
    onSuccess: bugResolved.type,
  })

export const assignBugToUser = (bugId, userId) =>
  apiCallBegan({
    url: url + '/' + bugId,
    method: 'patch',
    data: { userId },
    onSuccess: bugAssignedToUser.type,
  })
// export const loadBugs = () => (apiCallBegan({
//     url,
//     onStart: bugsRequested.type,
//     onSuccess: bugsReceived.type,
//     onError: bugsRequestFailed.type
// }))

// selector
// export const getUnresolvedBugs = state => {
//     return state.entities.bugs.filter(bug => !bug.resolved)
// }

export const getBug = (state, action) => {
  // console.log("action id", action.id);
  // return state.entities.users.findIndex(user => user.id === action.id)
  return state.entities.bugs.filter((bug) => bug.id === action.id)

  // return state.entities.bugs.filter(bug => !bug.resolved)
}

export const getUnresolvedBugs = createSelector(
  (state) => state.entities.bugs,
  (state) => state.entities.projects,
  (bugs, projects) => bugs.list.filter((bug) => !bug.resolved)
)

// action creators
// export const bugAdded = createAction("bugAdded");
// export const bugRemoved = createAction("bugRemoved");
// export const bugResolved = createAction("bugResolved");

// export const bugResolved = id => ({
//     type: BUG_RESOLVED,
//     payload: {
//         id
//     }
// })

// reducer

// export default createReducer([], {
//     // key: value
//     // actions: functions (events=>events handler)
//     [bugAdded.type]: (bugs, action) => {
//         bugs.push({
//             id: ++lastId,
//             description: action.payload.description,
//             resolved: false
//         });
//     },
//     [bugResolved.type]: (bugs, action) => {
//         const index = bugs.findIndex(bug => bug.id === action.payload.id)
//         bugs[index].resolved = true;
//     },
// })

// export default function reducer(state = [], action){
//     if (action.type === bugAdded.type){
//         return [
//             ...state,
//             {
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             }
//         ];
//     } else if(action.type === bugRemoved.type){
//         return state.filter(bug => bug.id !== action.payload.id);
//     } else if(action.type === bugResolved.type){
//         return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
//     } else {
//         return state;
//     }
// }
