import moment from 'moment';
import uuid from 'react-native-uuid';
import deepcopy from 'ts-deepcopy';
import { Member } from '../../data/data';
import { MemberAction } from './memberActions';
import { initialState, MemberState } from './memberState';

type KnownAction = MemberAction;

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
    case 'EDIT_MEMBER': {
        const nextMemberList = deepcopy(state.memberList);
        const member = action.payload;
        const index = state.memberList.findIndex((oldMember) => oldMember.id === member.id);
        if (index > -1) nextMemberList.splice(index, 1, member);
        return {
            ...state,
            memberList: nextMemberList
        };
    }
    case 'REMOVE_MEMBER': {
        const updatedMemberList = deepcopy(state.memberList);
        return {
            ...state,
            memberList: updatedMemberList.filter((item) => item.id !== action.payload)
        };
    }
    default: return state;
    }
}

export default memberReducer;