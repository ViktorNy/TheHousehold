import { CreateHouseholdAction, EditHouseholdAction, SetHouseholdAction } from './householdActions';
import { HouseholdState, initialState } from './householdState';
import deepcopy from 'ts-deepcopy';
import { Household } from '../../data/data';
import uuid from 'react-native-uuid';

type KnownAction = CreateHouseholdAction | EditHouseholdAction | SetHouseholdAction;

function householdReducer(state: HouseholdState = initialState, action: KnownAction): HouseholdState {
    switch (action.type) {
    case 'CREATE_HOUSEHOLD': {
        const newHousehold: Household = {
            name: action.payload.householdName,
            chores: [],
            codeToJoin: uuid.v4().toString().substring(0, 6).toUpperCase(),
            id: action.payload.householdId
        };
        return {
            ...state,
            householdList: [...state.householdList, newHousehold]
        };
    }
    case 'EDIT_HOUSEHOLD': {
        // Edit can be used for: add member, remove member, pause mamber, change member type
        const nextHouseholdList = deepcopy(state.householdList);
        const household = action.payload;
        const index = state.householdList.findIndex((oldHousehold) => oldHousehold.id === household.id);
        if (index > -1) nextHouseholdList.splice(index, 1, household);
        return {
            ...state,
            householdList: nextHouseholdList
        };
    }
    case 'SETHOUSEHOLD': {
        const selectedHousehold = deepcopy(state.householdList.find(h => h.id === action.payload));
        if (selectedHousehold) {
            return {
                ...state,
                currentHousehold: selectedHousehold
            };
        } else {
            return {
                ...state,
                currentHousehold: undefined
            };
        }
    }
    default: return state;
    }
}

export default householdReducer;

// ----------------------------------------------

// case 'JOIN': {
//     const index = state.householdList.findIndex(
//         (household) => household.id === action.payload.householdId)
//     const household = state.householdList[index];
//     household?.members.push(action.payload.member)
//     return {
//         ...state,
//         householdList: [...state.householdList.splice(index, 1, household)]
//     }
// }