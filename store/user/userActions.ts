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
    payload: string;
}
export interface ChangeAppearanceAction {
    type: 'CHANGE_APPEARANCE';
    payload: string;
}

export type UserAction = CreateUserAction | SetUserAction | ChangeAppearanceAction | CreateUserAction;
