import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import choreReducer from './chore/choreReducer';
import { HouseholdAction } from './household/householdActions';
import householdReducer from './household/householdReducer';
import { MemberAction } from './member/memberActions';
import memberReducer from './member/memberReducer';
import { UserAction } from './user/userActions';
import userReducer from './user/userReducer';

const rootReducers = combineReducers({
    household: householdReducer,
    user: userReducer,
    member: memberReducer
});

const thunkMiddleware = applyMiddleware<AppThunkDispatch>(thunk);
export const store = createStore(rootReducers, thunkMiddleware);

type KnownAction = UserAction | MemberAction | HouseholdAction;
export type AppThunkDispatch = ThunkDispatch<RootState, unknown, KnownAction>;

export type AppThunk<ReturnType = Promise<boolean>> = ThunkAction<ReturnType, RootState, unknown, KnownAction>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
