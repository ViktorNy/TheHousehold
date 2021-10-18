import { CreateUserAction, EditUserAction } from './userActions';
import { initialState, UserState } from './userState';

type KnownAction = CreateUserAction | EditUserAction;

function userReducer(state: UserState = initialState, action: KnownAction): UserState {
    switch (action.type) {
        case 'CREATE': {
            return {
                ...state,
                userList: [...state.userList, action.payload]
            }
        }
        case 'EDIT': {
            //Edit used for editing member
            const nextUserList = [...state.userList];
            const user = action.payload;
            const index = state.userList.findIndex((item) => item.id === user.id);
            if (index) nextUserList.splice(index, 1, user)
            return {
                ...state,
                userList: nextUserList
            };
        }
        default: return state;
    }
}

export default userReducer;