/* eslint-disable indent */
import deepcopy from 'ts-deepcopy';
import { User } from '../../data/data';
import { UserAction } from './userActions';
import { initialState, UserState } from './userState';

type KnownAction = UserAction;

function userReducer(state: UserState = initialState, action: KnownAction): UserState {
    switch (action.type) {
        case 'CREATE_USER': {
            const newUser: User = {
                id: action.payload.id,
                username: action.payload.username,
                email: action.payload.email,
                password: action.payload.password
            };
            return {
                ...{
                    user: newUser,
                    appearance: initialState.appearance
                }
            };
        }
        case 'SET_USER': {
            return {
                ...{
                    user: action.payload,
                    appearance: initialState.appearance // Appearance ska sättas till initialstate i början av appen?
                }
                // userList: nextUserList
            };
        }
        case 'CHANGE_APPEARANCE': {
            let currentAppearance = deepcopy(state.appearance);

            if (action.payload === 'dark' || action.payload === 'light') {
                currentAppearance = action.payload;
            } else {
                currentAppearance = 'auto';
            }

            return {
                ...state,
                appearance: currentAppearance
            };
        }
        default:
            return state;
    }
}

export default userReducer;
