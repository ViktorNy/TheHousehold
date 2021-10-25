import { RootState } from '../store';

export const getMembersOfHouseholdSelector = (state: RootState, householdId: string) => {
    const memberList = state.member.memberList.filter(item => item.householdId === householdId);
    return memberList;
};

export const getMemeberByIdSelector = (state: RootState, memberId: string) => {
    return state.member.memberList.find(m => m.id === memberId);
};