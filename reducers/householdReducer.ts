import { Household, Member } from '../data/data';

interface CreateHouseholdAction {
    type: 'CREATE';
    payload: Household; // Rätt! Wow! 
}

interface JoinHouseholdAction {
    type: 'JOIN';
    payload: {
        householdId: string,
        member: Member
    }; // Kanske rätt?
}

interface LeaveHouseholdAction {
    type: 'LEAVE';
    payload: any; // Fel
}

interface PauseHouseholdMemberAction {
    type: 'PAUSE';
    payload: any; // Fel
}

interface ChangeMemberTypeAction {
    type: 'CHANGE_TYPE';
    payload: any; // Fel
}

type KnownAction = CreateHouseholdAction
    | JoinHouseholdAction
    | LeaveHouseholdAction
    | PauseHouseholdMemberAction
    | ChangeMemberTypeAction;

interface HouseholdState {
    householdList: Household[]
}

const initialState: HouseholdState = {
    householdList: []
}

function householdReducer(state: HouseholdState = initialState, action: KnownAction): HouseholdState {
    switch (action.type) {
        case 'CREATE': {
            return {
                ...state,
                householdList: [...state.householdList, action.payload]
            }
        }
        case 'JOIN': {
            const index = state.householdList.findIndex(
                (household) => household.id === action.payload.householdId)
            const household = state.householdList[index];
            household?.members.push(action.payload.member)
            return {
                ...state,
                householdList: [...state.householdList.splice(index, 1, household)]
            }
        }
        default: return state;
    }
}