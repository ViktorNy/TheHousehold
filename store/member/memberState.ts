import { Member, mockedMemberData } from "../../data/data";

export interface MemberState {
    memberList: Member[]
}

export const initialState: MemberState = {
    memberList: mockedMemberData
}