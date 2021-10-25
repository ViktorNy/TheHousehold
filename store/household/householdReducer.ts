import { CreateHouseholdAction, EditHouseholdAction } from './householdActions';
import { HouseholdState, initialState } from './householdState';

type KnownAction = CreateHouseholdAction | EditHouseholdAction;

function householdReducer(state: HouseholdState = initialState, action: KnownAction): HouseholdState {
    switch (action.type) {
    case 'CREATE': {
        return {
            ...state,
            householdList: [...state.householdList, action.payload]
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