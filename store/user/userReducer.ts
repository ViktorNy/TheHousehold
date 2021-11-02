import { mockedUserData } from '../../data/data';
import { UserAction } from './userActions';
import { initialState, UserState } from './userState';
import deepcopy from 'ts-deepcopy';

type KnownAction = UserAction;

function userReducer(state: UserState = initialState, action: KnownAction): UserState {
    switch (action.type) {
    case 'CREATE': {
        return {
            ...state
            /// userList: [...state.userList, action.payload]
        };
    }
    case 'EDIT': {
        // Edit used for editing member
        // const nextUserList = [...state.user];
        // const user = action.payload;
        // const index = state.userList.findIndex((item) => item.id === user.id);
        // if (index) nextUserList.splice(index, 1, user);
        return {
            ...state
            // userList: nextUserList
        };
    }
    case 'GETUSER': {
        const loggedinUser = mockedUserData.find(u => u.id === action.payload);
        if (loggedinUser) {
            return {
                ...{
                    user: loggedinUser,
                    appearance: initialState.appearance // Appearance ska sättas till initialstate i början av appen?
                }
                // userList: nextUserList
            };
        } else {
            return {
                ...state
            };
        }
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
    default: return state;
    }
}

export default userReducer;