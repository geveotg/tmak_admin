export function TranslationReducer(state = {}, action) {
  if (action.type === "add_translation") {
    return {
      ...state,
      translation: action.payload.translation,
    };
  }

  return state;
}

export const initialTranslation = {
  translation: "",
};

export function selectTranslation(state) {
  return state.translationData.translation;
}

export function editTranslation(newTranslation) {
  return {
    type: "add_translation",
    payload: {
      translation: newTranslation,
    },
  };
}
