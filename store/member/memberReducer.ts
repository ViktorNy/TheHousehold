import { Member } from '../../data/data';
import { CreateMemberAction, EditMemberAction, RemoveMemberAction } from './memberActions';
import { initialState, MemberState } from './memberState';
import uuid from 'react-native-uuid';
import moment from 'moment';

type KnownAction = CreateMemberAction | EditMemberAction | RemoveMemberAction;

function memberReducer(state: MemberState = initialState, action: KnownAction): MemberState {
    switch (action.type) {
    case 'CREATE_MEMBER': {
        const newMember: Member = {
            avatar: '1',
            id: uuid.v4().toString(),
            householdId: action.payload.householdId,
            joinData: moment(new Date()).format('YYYY-MM-DD'),
            memberName: action.payload.memberName,
            memberType: action.payload.memberType,
            pausedHistory: [],
            userId: action.payload.userId
        };
        return {
            ...state,
            memberList: [...state.memberList, newMember]
        };
    }
    case 'EDIT': {
        // Edit used for editing member
        const nextMemberList = [...state.memberList];
        const member = action.payload;
        const index = state.memberList.findIndex((item) => item.id === member.id);
        if (index) nextMemberList.splice(index, 1, member);
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