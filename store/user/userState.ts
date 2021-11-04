import { User } from '../../data/data';

export interface UserState {
    user?: User;
    appearance: 'light' | 'dark' | 'auto';
}

export const initialState: UserState = {
    user: undefined,
    appearance: 'auto'
};
