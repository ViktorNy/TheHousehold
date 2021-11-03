import { User } from '../../data/data';

export interface CreateUserAction {
    type: 'CREATE_USER';
    payload: {
        id: string,
        username: string,
        email: string,
        password: string
    };
}

export interface EditUserAction {
    type: 'EDIT';
    payload: User;
}

export interface GetUserAction {
    type: 'GETUSER';
    payload: string;
}

export type UserAction = CreateUserAction | EditUserAction | GetUserAction;
