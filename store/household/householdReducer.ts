import { CreateHouseholdAction, EditHouseholdAction, SetHouseholdAction, EditChoreAction } from './householdActions';
import { HouseholdState, initialState } from './householdState';
import deepcopy from 'ts-deepcopy';

type KnownAction = CreateHouseholdAction | EditHouseholdAction | SetHouseholdAction | EditChoreAction;

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
    case 'EDIT_CHORELIST_IN_HOUSEHOLD': {
        const allHouseholds = deepcopy(state.householdList);

        // Edit used for editing chore
        const nextHousehold = deepcopy(allHouseholds.find((h) => h.id === action.payload.householdId));

        const householdIndex = allHouseholds.findIndex((h) => h.id === nextHousehold?.id);

        const chore = action.payload.chore;
        const index = nextHousehold!.chores.findIndex((oldChore) => oldChore.id === chore.id);

        if (index !== -1) nextHousehold?.chores.splice(index!, 1, chore);
        if (householdIndex !== -1) allHouseholds.splice(householdIndex, 1, nextHousehold!);
        return {
            ...state,
            householdList: allHouseholds
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