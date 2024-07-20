export function editwidgets(newwidgets) {
  return {
    type: "add_widgets",
    payload: {
      widgets: newwidgets,
    },
  };
}
