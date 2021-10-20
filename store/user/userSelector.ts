import { RootState } from "../store";

export const getAllUsersSelector = (state: RootState) => state.user.userList;

export const getUserByIdSelector = (state: RootState, userId?: string) => state.user.userList.find(u => u.id === userId);