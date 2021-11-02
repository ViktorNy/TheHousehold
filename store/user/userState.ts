import { User } from '../../data/data';

export interface UserState {
    user?: User,
    appearance: 'light' | 'dark' | 'auto'
    // TODO: API har all information, här behövs bara en user laddas in = den som loggat in -->  vilka hushåll (dess chore + medlemar)
    // TODO: Flytta "username" från user till member interface
    // alt. om inget API: skapa en fil i store "database" med relevant information för EN användare = den kan lyssna på action och lägga till användare..
}

export const initialState: UserState = {
    user: undefined,
    appearance: 'auto'
};