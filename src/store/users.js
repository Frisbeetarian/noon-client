import { createSlice } from "@reduxjs/toolkit";

let lastId = 0;

const slice = createSlice({
  name: "users",
  initialState: [],
  reducers: {
    userAdded: (users, action) => {
      users.push({
        id: ++lastId,
        name: action.payload.name,
        bugsAssigned: [],
      });
    },
    assignBugToUser: (users, action) => {
      const { bugId, userId } = action.payload;
      const index = users.findIndex((user) => user.id === userId);

      // const index = bugs.findIndex(bug => bug.id === action.payload.id)
      users[index].bugsAssigned.push(bugId);
    },
  },
});

// selector
export const getUser = (state, action) => {
  return state.entities.users.filter((user) => user.id === action.id);
  // return state.entities.bugs.filter(bug => !bug.resolved)
};

export const getBugsAssignedToUser = (state, action) => {
  const user = state.entities.users.filter((user) => user.id === action.id);
  const bugsForUser = [];

  for (let index = 0; index <= user[0].bugsAssigned.length - 1; index++) {
    const bug = state.entities.bugs.filter(
      (bug) => bug.id === user[0].bugsAssigned[index]
    );

    bugsForUser.push(bug);
    // const fef = [...bugsForUser, bug];
  }

  // for(const bugId in user[0].bugsAssigned){
  //     const bug = state.entities.bugs.filter(bug => bug.id === bugId);
  //
  //     return [...bugsForUser, bug];
  // }
  /*    user[0].bugsAssigned.map(bugId => {
        const bug = state.entities.bugs.filter(bug => bug.id === bugId);

        return [...bugsForUser, bug];
    })*/

  return bugsForUser;
};

export const { userAdded, assignBugToUser } = slice.actions;
export default slice.reducer;
