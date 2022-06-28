import { combineReducers } from 'redux';
import entitiesReducer from './entities';
// import bugsReducer from './bugs';
// import projectsReducer from './projects';

export default combineReducers({
    entities: entitiesReducer,
    // bugs: bugsReducer,
    // projects: projectsReducer
})

// // import { BUG_ADDED, BUG_REMOVED } from "./actionTypes";
// import * as actions from "./actionTypes";
//
// let lastId = 0;
//
// export default function reducer(state = [], action){
//     if (action.type === actions.BUG_ADDED){
//         return [
//             ...state,
//             {
//                 id: ++lastId,
//                 description: action.payload.description,
//                 resolved: false
//             }
//         ];
//     } else if(action.type === actions.BUG_REMOVED){
//         return state.filter(bug => bug.id !== action.payload.id);
//     } else if(action.type === actions.BUG_RESOLVED){
//         return state.map(bug => bug.id !== action.payload.id ? bug : {...bug, resolved: true})
//     } else {
//         return state;
//     }
// }
