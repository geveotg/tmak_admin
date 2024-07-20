export function appInfoReducer(state = {}, action) {
  if (action.type === "add_appInfo") {
    return {
      ...state,
      appInfo: action.payload.appInfo,
    };
  }

  return state;
}

export const initialappInfo = {
  appInfo: "",
};

export function selectappInfo(state) {
  return state.appInfoData.appInfo;
}

export function editAppInfo(newappInfo) {
  return {
    type: "add_appInfo",
    payload: {
      appInfo: newappInfo,
    },
  };
}
