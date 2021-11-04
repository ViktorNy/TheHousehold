import { Chore, ChoreScore, Household } from '../../data/data';

export interface CreateHouseholdAction {
    type: 'CREATE_HOUSEHOLD';
    payload: { householdName: string; householdId: string };
}

export interface EditHouseholdAction {
    type: 'EDIT_HOUSEHOLD';
    payload: Household;
}
export interface SetHouseholdAction {
    type: 'SETHOUSEHOLD';
    payload: string;
}
export interface EditChoreListAction {
    type: 'EDIT_CHORELIST_IN_HOUSEHOLD';
    payload: {
        chore: Chore;
        householdId: string;
    };
}
export interface RemoveChoreAction {
    type: 'REMOVE_CHORE_FROM_HOUSEHOLD';
    payload: {
        chore: Chore;
        householdId: string;
    };
}
export interface CreateChoreAction {
    type: 'CREATE_CHORE_IN_HOUSEHOLD';
    payload: {
        chore: { name: string; description: string; frequency: number; score: ChoreScore };
        householdId: string;
    };
}
export interface EditChoreAction {
    type: 'EDIT_CHORE_IN_HOUSEHOLD';
    payload: {
        chore: Chore;
        householdId: string;
    };
}

export type HouseholdAction =
    | CreateHouseholdAction
    | EditHouseholdAction
    | SetHouseholdAction
    | EditChoreAction
    | EditChoreListAction
    | RemoveChoreAction
    | CreateChoreAction;
