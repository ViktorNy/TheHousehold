import { RootState } from '../store';

export const getAllHouseholdsByUserIdSelector = (state: RootState, userId?: string) => {
    if (!userId) return [];
    const memberShipList = state.member.memberList.filter(m => m.userId === userId);
    const userHouseholds = state.household.householdList.filter(h => memberShipList.find(m => m.householdId === h.id));
    return userHouseholds;
};

export const getChoreByIdSelector = (state: RootState, choreId: string, householdId: string) => {
    const household = state.household.householdList.find(h => h.id === householdId);
    if (household) {
        const chore = household.chores.find(c => c.id === choreId);
        return chore;
    } else {
        return undefined;
    }
};

export const getHouseholdByIdSelector = (state: RootState, householdId: string) => {
    return state.household.householdList.find(h => h.id === householdId);
};

export const getAllHouseholdsSelector = (state: RootState) => state.household.householdList;