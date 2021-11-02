import { UserAction } from './userActions';
import { initialState, UserState } from './userState';
import { mockedUserData, User } from '../../data/data';
import uuid from 'react-native-uuid';

type KnownAction = UserAction;

function userReducer(state: UserState = initialState, action: KnownAction): UserState {
    switch (action.type) {
    case 'CREATE_USER': {
        const newUser: User = {
            id: uuid.v4().toString(),
            username: action.payload.userName,
            email: action.payload.email,
            password: action.payload.password
        };
        return {
            ...{ user: newUser }
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