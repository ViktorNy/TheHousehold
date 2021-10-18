import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";
import { combineReducers, createStore } from "redux";
import choreReducer from "./chore/choreReducer";
import householdReducer from "./household/householdReducer";
import memberReducer from "./member/memberReducer";
import userReducer from "./user/userReducer";


const rootReducers = combineReducers({
    household: householdReducer,
    user: userReducer,
    chore: choreReducer,
    member: memberReducer,
})

export const store = createStore(rootReducers);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;