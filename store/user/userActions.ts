import { User } from '../../data/data';
import { AppThunk } from '../store';

export interface CreateUserAction {
    type: 'CREATE';
    payload: User;
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
    type: 'CHANGE_APPEARANCE',
    payload: string
}

export type UserAction = CreateUserAction | EditUserAction | SetUserAction | ChangeAppearanceAction;

export const loginUser = (name: string, password: string): AppThunk =>
    async (dispatch, getState) => {
        dispatch({ type: 'SET_USER', payload: name });
    };
