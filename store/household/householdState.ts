import { Household, mockedHouseholdData } from '../../data/data';

export interface HouseholdState {
    householdList: Household[],
    currentHouseholdId?: string
}

export const initialState: HouseholdState = {
    householdList: mockedHouseholdData,
    currentHouseholdId: undefined
};