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
    type: 'EDIT';
    payload: Member;
}

export interface RemoveMemberAction {
    type: 'REMOVE';
    payload: Member;
}
