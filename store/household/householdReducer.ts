import { CreateHouseholdAction, EditHouseholdAction, SetHouseholdAction } from './householdActions';
import { HouseholdState, initialState } from './householdState';
import deepcopy from 'ts-deepcopy';
import { Household } from '../../data/data';

type KnownAction = CreateHouseholdAction | EditHouseholdAction | SetHouseholdAction;

function householdReducer(state: HouseholdState = initialState, action: KnownAction): HouseholdState {
    switch (action.type) {
    case 'CREATE_HOUSEHOLD': {
        const newHousehold: Household = {
            name: action.payload.householdName,
            chores: [],
            codeToJoin: (Math.random() * (9999 - 1000) + 1000).toString(),
            id: action.payload.householdId
        };
        return {
            ...state,
            householdList: [...state.householdList, newHousehold]
        };
    }
    case 'EDIT': {
        // Edit can be used for: add member, remove member, pause mamber, change member type
        const nextHouseholdList = [...state.householdList];
        const household = action.payload;
        const index = state.householdList.findIndex((item) => item.id === household.id);
        if (index) nextHouseholdList.splice(index, 1, household);
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