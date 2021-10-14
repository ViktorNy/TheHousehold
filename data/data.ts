

export interface User {
    id: string,
    email: string,
    username: string,
    password: string,
    households: Household[], //tom array i början
}

export interface Household {
    id: string,
    name: string,
    codeToJoin: string,
    members: Member[],
    pausedMembers: PausedMember[],
    chores: Chores[],
}

export type MemberType = "member" | "owner";

export interface Member {
    //householdId: string,  // behövs inte om vi bara har en data fil, men riktig server ?
    userId: string,
    memberType: MemberType,
    avatar: string //format?
    joinData: Date,
}

export interface PausedMember {
    householdId: string,
    userId: string,
    fromDate: Date, //ta med år, månad och datum
    toDate: Date
}

export interface Chores {
    id: string,
    name: string,
    description: string,
    frequency: number, // date ?
    lastDone: number, //?? data ?
    doneBy: ChoresDoneBy[],
    score: 2 | 4 | 6 | 8,
    signedToUserId?: string[],
}

export interface ChoresDoneBy {
    choresId: string,
    userId: string,
    date: Date,
    score: number,  //spara score här  ifall men justerar det senare
}