import { applyMiddleware, createStore, Middleware, Store } from "redux";
import thunk from "redux-thunk";
import { initialState, rootReducer, RootState } from "./RootReducer";

const middleware: Middleware[] = [thunk];
const middlewareSetup = applyMiddleware(...middleware);

export const initializeStore = (initialProps?: Partial<RootState>): Store =>
  createStore(
    rootReducer,
    { ...initialState, ...initialProps },
    middlewareSetup
  );
