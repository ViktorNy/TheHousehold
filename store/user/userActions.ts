import { User } from '../../data/data';
import firebaseInit from '../firebase';
import { AppThunk } from '../store';
import uuid from 'react-native-uuid';
import { ref, set } from 'firebase/database';

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
    payload: User;
}
export interface ChangeAppearanceAction {
    type: 'CHANGE_APPEARANCE',
    payload: string
}

export type UserAction = CreateUserAction | EditUserAction | SetUserAction | ChangeAppearanceAction;

export const loginUser = (name: string, password: string): AppThunk =>
    async (dispatch) => {
        // Need to find a better way to find localhost on computer from emulator
        try {
            const db = firebaseInit();
            // eslint-disable-next-line no-undef
            const response = await fetch('http://10.0.0.6:3000/api/user/' + name + '/' + password);
            if (response.status !== 200) return Promise.resolve(false);
            const user: User = await response.json();
            dispatch({ type: 'SET_USER', payload: user });
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    };

export const createUser = (username: string, email: string, password: string): AppThunk =>
    async (dispatch) => {
        try {
            const db = firebaseInit();
            const id = uuid.v4();
            set(ref(db, 'users/' + id), {
                username: email,
                email: username,
                password: password
            }).then(() => {
                // dispatch({ type: 'SET_USER', payload: user });
                console.log('registrera');
                return Promise.resolve(false);
            });
            return Promise.resolve(false);
        } catch (error) {
            return Promise.reject(error);
        }
    };
