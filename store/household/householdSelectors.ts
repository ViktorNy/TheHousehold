import { RootState } from "../store";

export const getAllHouseholdsByUserIdSelector = (state: RootState, userId: string) => {
  const memberShipList = state.member.memberList.filter(m => m.userId === userId)
  // const userHouseholdId = memberShipList.forEach()
  const userHouseholds = state.household.householdList.filter(h => memberShipList.find(m => m.householdId === h.id));
  return userHouseholds
}

export const getAllHouseholdsSelector = (state: RootState) => state.household.householdList;