import { Chore } from '../../data/data';

export interface CreateChoreAction {
    type: 'CREATE_CHORE';
    payload: Chore;
}

export interface EditChoreAction {
    type: 'EDIT_CHORE';
    payload: Chore;
}

export interface RemoveChoreAction {
    type: 'REMOVE';
    payload: Chore;
}
