import { Chore } from "../../data/data";

export interface ChoreState {
    choreList: Chore[]
}

export const initialState: ChoreState = {
    choreList: []
}