import { Household, mockedHouseholdData } from '../../data/data';

export interface HouseholdState {
    householdList: Household[]
}

export const initialState: HouseholdState = {
    householdList: mockedHouseholdData
};