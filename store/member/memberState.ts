import { Member } from "../../data/data";

export interface MemberState {
    memberList: Member[]
}

export const initialState: MemberState = {
    memberList: []
}