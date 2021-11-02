import { Member } from '../../data/data';
import { CreateMemberAction, EditMemberAction, RemoveMemberAction } from './memberActions';
import { initialState, MemberState } from './memberState';
import uuid from 'react-native-uuid';
import moment from 'moment';

type KnownAction = CreateMemberAction | EditMemberAction | RemoveMemberAction;

function memberReducer(state: MemberState = initialState, action: KnownAction): MemberState {
    switch (action.type) {
    case 'CREATE_MEMBER': {
        // Code to find select random free avatar
        const allHouseholdmembers = state.memberList.filter(m => m.householdId === action.payload.householdId);
        const freeAvatars: string[] = [];
        for (let i = 1; i < 11; i++) {
            if (!allHouseholdmembers.find(m => m.avatar === i.toString())) {
                freeAvatars.push(i.toString());
            }
        }
        const randomFreeAvatar = freeAvatars[Math.floor(Math.random() * freeAvatars.length)];

        const newMember: Member = {
            avatar: randomFreeAvatar,
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