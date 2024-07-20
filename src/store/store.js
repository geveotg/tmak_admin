import { createStore, combineReducers, applyMiddleware } from "redux";

import {
    DataUserProfileReducer,
    initialCourentUser,
} from "../features/DataUserProfile/DataUserProfileSlise";

import {
    TranslationReducer,
    initialTranslation,
} from "../features/Translation/TranslationSlice";
import {
    initialappInfo,
    appInfoReducer,
} from "../features/appInfoSlice/AppInfoSlice";
import { widgetsReducer } from "../features/widgets/widgetsSlice";
import { initialwidgets } from "../features/widgets/initialWidgets";
import thunk from "redux-thunk";
const store = createStore(
    combineReducers({
        userInfo: DataUserProfileReducer,
        translationData: TranslationReducer,
        appInfoData: appInfoReducer,
        widgetsData: widgetsReducer,
    }),

    {
        userInfo: initialCourentUser,
        translationData: initialTranslation,
        appInfoData: initialappInfo,
        widgetsData: initialwidgets,
    },
    applyMiddleware(thunk)
);

export default store;
