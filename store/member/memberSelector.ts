import { RootState } from "../store";

export const getMembersOfHouseholdSelector = (state: RootState, householdId: string) => {
    const memberList = state.member.memberList.filter(item => item.householdId === householdId);
     return memberList  ? memberList : []
    

}