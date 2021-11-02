import deepcopy from 'ts-deepcopy';
import { CreateChoreAction, EditChoreAction, RemoveChoreAction } from './choreActions';
import { ChoreState, initialState } from './choreState';

type KnownAction = CreateChoreAction | EditChoreAction | RemoveChoreAction;

function choreReducer(state: ChoreState = initialState, action: KnownAction): ChoreState {
    switch (action.type) {
    case 'CREATE': {
        return {
            ...state,
            choreList: [...state.choreList, action.payload]
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
    default: return state;
    }
}

export default choreReducer;