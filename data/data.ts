

export interface User {
    id: string,
    email: string,
    username: string,
    password: string,
    // households: Household[], //tom array i början
}

export interface Household {
    id: string,
    name: string,
    codeToJoin: string,
    // members: Member[],
    chores: Chore[],
}

export type MemberType = "member" | "owner";

export interface Member {
    id: string,
    householdId: string,
    userId: string,
    memberType: MemberType,
    avatar: string, //format?
    joinData: Date,
    pausedHistory: PausedMember[],
}

export interface PausedMember {
    householdId: string,
    userId: string,
    fromDate: Date, //ta med år, månad och datum
    toDate: Date
}

export type ChoreScore = 1 | 2 | 4 | 6 | 8;

export interface Chore {
    id: string,
    name: string,
    description: string,
    frequency: number,
    lastDone?: string,
    doneBy: ChoreDoneBy[],
    score: ChoreScore,
    signedToUserId: string[],
}

export interface ChoreDoneBy {
    choreId: string,
    userId: string,
    date: string,
    score: number,  //spara score här  ifall men justerar det senare
}



// ------------ MOCKED DATA BELOW -----------------

export const mockedMemberData: Member[] = [
    {
        id: '1',
        userId: '1',
        memberType: 'owner',
        avatar: '1',
        joinData: new Date('2021-01-01'),
        pausedHistory: [],
        householdId: '1'
    },
    {
        id: '2',
        userId: '2',
        memberType: 'member',
        avatar: '2',
        joinData: new Date('2021-01-02'),
        pausedHistory: [],
        householdId: '1'
    },
    {
        id: '3',
        userId: '2',
        memberType: 'owner',
        avatar: '2',
        joinData: new Date('2021-01-02'),
        pausedHistory: [],
        householdId: '2'
    }
]


export const mockedHouseholdData: Household[] = [
    {
        id: '1',
        name: 'Hemmet',
        codeToJoin: '123',
        chores: [
            {
                id: '1',
                name: 'Städa',
                description: 'Copy pasta lorem ipsum städa då snälla hjälp mig',
                frequency: 1,
                score: 4,
                signedToUserId: ["1"],
                lastDone: '2021-09-12',
                doneBy:[
                        {
                            choreId: '1',
                            userId: '1',
                            date: '2021-09-12',
                            score: 4,
                        }]
            },
            {
                id: '2',
                name: 'Koka kaffe',
                description: 'Koka kaffet snabbt så in i helvete annars blir jag GRINIG',
                frequency: 2,
                doneBy: [],
                score: 8,
                signedToUserId: []
            }],
    },
    {
        id: '2',
        name: 'Hemmet Jr',
        codeToJoin: '444',
        chores: [
            {
                id: '3',
                name: 'Kasta hunden',
                description: 'Den sköter sig inte, den ska ut.',
                frequency: 2,
                doneBy: [],
                score: 8,
                signedToUserId: []
            }
        ],
    }
]

export const mockedUserData: User[] = [
    {
        id: "1",
        email: "svensson@mail.com",
        username: "SvenSvensson",
        password: "Svensson"
    },
    {
        id: "2",
        email: "johansson@mail.com",
        username: "JohanJohansson",
        password: "Johansson"
    }
]