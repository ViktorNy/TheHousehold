import { Chore } from '../../data/data';

export interface CreateChoreAction {
    type: 'CREATE';
    payload: Chore;
}

export interface EditChoreAction {
    type: 'EDIT';
    payload: Chore;
}

export interface RemoveChoreAction {
    type: 'REMOVE';
    payload: Chore;
}
