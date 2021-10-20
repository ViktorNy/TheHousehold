import { mockedUserData, User } from "../../data/data";

export interface UserState {
    userList: User[]
}

export const initialState: UserState = {
    userList: mockedUserData
}