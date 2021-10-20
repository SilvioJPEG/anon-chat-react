import { TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers } from "redux";
import channelReducer from "./channels";
import userReducer from "./user";
import componentsReducer from "./components";
import MessagesReducer from "./messages";

export const rootReducer = combineReducers({
    channelReducer,
    userReducer,
    componentsReducer,
    MessagesReducer
});

type RootState = ReturnType<typeof rootReducer>;
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;