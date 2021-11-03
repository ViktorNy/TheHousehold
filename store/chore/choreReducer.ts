/* eslint-disable indent */
import deepcopy from 'ts-deepcopy';
import { Chore } from '../../data/data';
import { CreateChoreAction, EditChoreAction, RemoveChoreAction } from './choreActions';
import { ChoreState, initialState } from './choreState';
import uuid from 'react-native-uuid';
import moment from 'moment';

type KnownAction = CreateChoreAction | EditChoreAction | RemoveChoreAction;

function choreReducer(state: ChoreState = initialState, action: KnownAction): ChoreState {
    switch (action.type) {
        case 'CREATE_CHORE': {
            const newChore: Chore = {
                id: uuid.v4().toString(),
                name: action.payload.name,
                description: action.payload.description,
                frequency: action.payload.frequency,
                lastDone: '',
                createdDate: moment(new Date()).format('YYYY-MM-DD'), // lagt till / emelie
                doneBy: [],
                score: action.payload.score,
                signedToUserId: ['']
            };
            return {
                ...state,
                choreList: [...state.choreList, newChore]
            };
        }
        case 'EDIT_CHORE': {
            // Edit used for editing chore
            const nextChoreList = deepcopy(state.choreList);
            const chore = action.payload;
            const index = state.choreList.findIndex((item) => item.id === chore.id);
            if (index) nextChoreList.splice(index, 1, chore);
            return {
                choreList: nextChoreList
            };
        }
        case 'REMOVE_CHORE': {
            const nextChoreList = [...state.choreList];
            const chore = deepcopy(action.payload);
            return {
                ...state,
                choreList: nextChoreList.filter((item) => item.id !== chore.id)
            };
        }
        default:
            return state;
    }
}

export default choreReducer;
