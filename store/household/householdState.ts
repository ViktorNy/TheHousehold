import { Household, mockedHouseholdData } from '../../data/data';

export interface HouseholdState {
    householdList: Household[],
    currentHousehold?: Household
    // TODO: API ladda in alla households som är kopplade till user
}

export const initialState: HouseholdState = {
    householdList: mockedHouseholdData,
    currentHousehold: undefined
};