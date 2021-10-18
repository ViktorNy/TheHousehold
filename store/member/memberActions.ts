import { Member } from "../../data/data";

export interface CreateMemberAction {
    type: 'CREATE';
    payload: Member;
}

export interface EditMemberAction {
    type: 'EDIT';
    payload: Member;
}

export interface RemoveMemberAction {
    type: 'REMOVE';
    payload: Member;
}
