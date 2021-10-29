import { mockedUserData } from '../../data/data';
import { UserAction } from './userActions';
import { initialState, UserState } from './userState';

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
    case 'GET': {
        const loggedinUser = mockedUserData.find(u => u.id === action.payload);
        console.log('user id in reducer' + loggedinUser?.id);
        if (loggedinUser) {
            return {
                ...{ user: loggedinUser }
                // userList: nextUserList
            };
        } else {
            return {
                ...state
            };
        }
    }
    default: return state;
    }
}

export default userReducer;