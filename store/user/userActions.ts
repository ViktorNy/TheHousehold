/* eslint-disable indent */
import { addDoc, collection, getDocs } from 'firebase/firestore';
import uuid from 'react-native-uuid';
import { User } from '../../data/data';
import firebaseInit from '../firebase';
import { AppThunk } from '../store';

export interface CreateUserAction {
    type: 'CREATE_USER';
    payload: {
        id: string;
        username: string;
        email: string;
        password: string;
    };
}

export interface SetUserAction {
    type: 'SET_USER';
    payload: User;
}
export interface ChangeAppearanceAction {
    type: 'CHANGE_APPEARANCE';
    payload: string;
}

export type UserAction = CreateUserAction | SetUserAction | ChangeAppearanceAction;

export const loginUser =
    (name: string, password: string): AppThunk =>
    async (dispatch) => {
        // Need to find a better way to find localhost on computer from emulator
        try {
            // eslint-disable-next-line no-undef
            const db = firebaseInit();
            const docRef = await getDocs(collection(db, 'users'));
            let user: User | undefined;
            docRef.forEach((doc) => {
                const fetchUser = doc.data() as User;
                if (fetchUser.password === password && (fetchUser.username === name || fetchUser.email === name)) {
                    user = fetchUser;
                }
            });
            if (user) {
                dispatch({ type: 'SET_USER', payload: user });
                return Promise.resolve(true);
            } else {
                return Promise.resolve(false);
            }
        } catch (error) {
            return Promise.reject(error);
        }
    };

export const createUser =
    (username: string, email: string, password: string): AppThunk =>
    async (dispatch) => {
        if (email === '' || username === '' || password === '') {
            return Promise.resolve(false);
        }
        try {
            const user: User = {
                username: username,
                email: email,
                password: password,
                id: uuid.v4().toString()
            };
            const db = firebaseInit();
            await addDoc(collection(db, 'users'), {
                username: user.username,
                email: user.email,
                password: user.password,
                id: user.id
            }).then((a) => {
                dispatch({ type: 'SET_USER', payload: user });
            });
            return Promise.resolve(true);
        } catch (error) {
            return Promise.reject(error);
        }
    };
