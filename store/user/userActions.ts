import { User } from '../../data/data';

export interface CreateUserAction {
    type: 'CREATE';
    payload: User;
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
