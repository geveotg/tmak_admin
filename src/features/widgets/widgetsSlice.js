export function widgetsReducer(state = {}, action) {
  if (action.type === "add_widgets") {
    return {
      ...state,
      widgets: action.payload.widgets,
    };
  }

  return state;
}
