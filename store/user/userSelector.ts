import { RootState } from '../store';

// export const getAllUsersSelector = (state: RootState) => state.user.userList;

export const getUserByIdSelector = (state: RootState) => state.user.user;