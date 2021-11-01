import { Household } from '../../data/data';

export interface CreateHouseholdAction {
    type: 'CREATE_HOUSEHOLD';
    payload: {householdName: string, householdId: string}; // Rätt! Wow!
}

export interface EditHouseholdAction {
    type: 'EDIT_HOUSEHOLD';
    payload: Household;
}
export interface SetHouseholdAction{
    type: 'SETHOUSEHOLD';
    payload: string;
}

// ----------------------------------------------

// export interface JoinHouseholdAction {
//     type: 'JOIN';
//     payload: {
//         householdId: string,
//         member: Member
//     }; // Kanske rätt?
// }

// export interface LeaveHouseholdAction {
//     type: 'LEAVE';
//     payload: any; // Fel
// }

// export interface PauseHouseholdMemberAction {
//     type: 'PAUSE';
//     payload: any; // Fel
// }

// export interface ChangeMemberTypeAction {
//     type: 'CHANGE_TYPE';
//     payload: any; // Fel
// }
