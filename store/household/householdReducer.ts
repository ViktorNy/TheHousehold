/* eslint-disable indent */
import moment from 'moment';
import uuid from 'react-native-uuid';
import deepcopy from 'ts-deepcopy';
import { Household } from '../../data/data';
import { HouseholdAction } from './householdActions';
import { HouseholdState, initialState } from './householdState';

type KnownAction = HouseholdAction;

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
            const householdIndex = state.householdList.findIndex((h) => h.id === action.payload);

            if (householdIndex > -1) {
                return {
                    ...state,
                    currentHouseholdId: action.payload
                };
            } else {
                return {
                    ...state,
                    currentHouseholdId: undefined
                };
            }
        }

        // TODO: Issue #110
        case 'EDIT_CHORELIST_IN_HOUSEHOLD': {
            const allHouseholds = deepcopy(state.householdList);

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
        case 'REMOVE_CHORE_FROM_HOUSEHOLD': {
            const allHouseholds = deepcopy(state.householdList);
            const updatedHousehold = allHouseholds.find((h) => h.id === action.payload.householdId);
            const householdIndex = allHouseholds.findIndex((h) => h.id === updatedHousehold?.id);
            const chore = deepcopy(action.payload.chore);
            const choreIndex = updatedHousehold!.chores.findIndex((oldChore) => oldChore.id === chore.id);

            if (choreIndex !== -1) updatedHousehold?.chores.splice(choreIndex!, 1);
            if (householdIndex !== -1) allHouseholds.splice(householdIndex, 1, updatedHousehold!);
            return {
                ...state,
                householdList: allHouseholds
            };
        }
        case 'CREATE_CHORE_IN_HOUSEHOLD': {
            const allHouseholds = deepcopy(state.householdList);
            const updatedHousehold = allHouseholds.find((h) => h.id === action.payload.householdId);

            const newChore = {
                id: uuid.v4().toString(),
                name: action.payload.chore.name,
                description: action.payload.chore.description,
                frequency: action.payload.chore.frequency,
                // lastDone: '',
                createdDate: moment(new Date()).format('YYYY-MM-DD'),
                doneBy: [],
                score: action.payload.chore.score,
                signedToUserId: []
            };
            updatedHousehold?.chores.push(newChore);
            return {
                ...state,
                householdList: allHouseholds
            };
        }
        // TODO: Issue #110
        case 'EDIT_CHORE_IN_HOUSEHOLD': {
            const allHouseholds = deepcopy(state.householdList);

            const nextHousehold = deepcopy(allHouseholds.find((h) => h.id === action.payload.householdId));

            const householdIndex = allHouseholds.findIndex((h) => h.id === nextHousehold?.id);

            const chore = action.payload.chore;
            const index = nextHousehold!.chores.findIndex((oldChore) => oldChore.id === chore.id);

            if (householdIndex !== -1) allHouseholds.splice(householdIndex, 1, nextHousehold!);

            const newChore = {
                id: chore.id,
                name: action.payload.chore.name,
                description: action.payload.chore.description,
                frequency: action.payload.chore.frequency,
                lastDone: chore.lastDone,
                createdDate: chore.createdDate,
                doneBy: chore.doneBy,
                score: action.payload.chore.score,
                signedToUserId: chore.signedToUserId
            };
            if (index !== -1) nextHousehold?.chores.splice(index!, 1, newChore);
            return {
                ...state,
                householdList: allHouseholds
            };
        }
        default:
            return state;
    }
}

export default householdReducer;
