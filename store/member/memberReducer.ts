import { CreateMemberAction, EditMemberAction, RemoveMemberAction } from './memberActions';
import { initialState, MemberState } from './memberState';

type KnownAction = CreateMemberAction | EditMemberAction | RemoveMemberAction;

function memberReducer(state: MemberState = initialState, action: KnownAction): MemberState {
    switch (action.type) {
        case 'CREATE': {
            return {
                ...state,
                memberList: [...state.memberList, action.payload]
            }
        }
        case 'EDIT': {
            //Edit used for editing member
            const nextMemberList = [...state.memberList];
            const member = action.payload;
            const index = state.memberList.findIndex((item) => item.id === member.id);
            if (index) nextMemberList.splice(index, 1, member)
            return {
                ...state,
                memberList: nextMemberList
            };
        }
        case 'REMOVE': {
            const nextMemberList = [...state.memberList];
            const chore = action.payload;
            return {
                ...state,
                memberList: nextMemberList.filter((item) => item.id !== chore.id)
            };
        }
        default: return state;
    }
}

export default memberReducer;