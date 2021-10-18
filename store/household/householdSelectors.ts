import { RootState } from "../store";

export const membersOfHouseholdSelector = (state: RootState, id?: string) => {
  if (id) {
      const memberList = state.household.householdList.find(item => item.id === id)?.members;
    return memberList ? memberList : []
  } 
  else {
      return []
  } 
}

export const getAllHouseholdsByUserIdSelector = (state: RootState, userId: string) => {
   return state.household.householdList.filter((item) =>
  item.members.filter((item) => item.userId === userId)
  );
}

export const getAllHouseholdsSelector = (state: RootState) => state.household.householdList;