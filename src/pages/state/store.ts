import { applyMiddleware, createStore, Middleware } from "redux";
import thunk from "redux-thunk";
import { initialState, rootReducer } from "./RootReducer";

const middleware: Middleware[] = [thunk];
const middlewareSetup = applyMiddleware(...middleware);

const store = createStore(rootReducer, initialState, middlewareSetup);

export default store;