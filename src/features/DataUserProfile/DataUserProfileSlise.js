export function DataUserProfileReducer(state = {}, action) {
  if (action.type === "add_user") {
    return {
      ...state,
      user: action.payload.user,
    };
  }

  return state;
}

export const initialCourentUser = {
  user: "",
};

export function selectUser(state) {
  return state.userInfo.user;
}

export function editUser(newUser) {
  return {
    type: "add_user",
    payload: {
      user: newUser,
    },
  };
}
