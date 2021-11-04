import { User } from '../../data/data';

export interface CreateUserAction {
    type: 'CREATE_USER';
    payload: {
        id: string;
        username: string;
        email: string;
        password: string;
    };
}

export interface EditUserAction {
    type: 'EDIT';
    payload: User;
}

export interface SetUserAction {
    type: 'SET_USER';
    payload: string;
}
export interface ChangeAppearanceAction {
    type: 'CHANGE_APPEARANCE';
    payload: string;
}

export type UserAction = CreateUserAction | EditUserAction | SetUserAction | ChangeAppearanceAction | CreateUserAction;
