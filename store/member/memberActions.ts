import { Member, MemberType } from '../../data/data';

export interface CreateMemberAction {
    type: 'CREATE_MEMBER';
    payload: {
        userId: string,
        householdId: string,
        memberType: MemberType,
        memberName: string,
    };
}

export interface EditMemberAction {
    type: 'EDIT_MEMBER';
    payload: Member;
}

export interface RemoveMemberAction {
    type: 'REMOVE_MEMBER';
    payload: string;
}
