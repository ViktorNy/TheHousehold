
export interface User {
    id: string,
    email: string,
    username: string,
    password: string,
}

export interface Household {
    id: string,
    name: string,
    codeToJoin: string,
    chores: Chore[],
}

export type MemberType = 'member' | 'owner';

export interface Member {
    id: string,
    householdId: string,
    userId: string,
    memberType: MemberType,
    avatar: string,
    joinData: string,
    pausedHistory: PausedMember[],
}

export interface PausedMember {
    householdId: string,
    userId: string,
    fromDate: Date, // ta med år, månad och datum
    toDate: Date
}

export interface MemberAvatar {
    id: string,
    avatar: string,
    backgroundColor: string
}

export type ChoreScore = 1 | 2 | 4 | 6 | 8;

export interface Chore {
    id: string,
    name: string,
    description: string,
    frequency: number,
    lastDone?: string,
    createdDate: string, // lagt till / emelie
    doneBy: ChoreDoneBy[],
    score: ChoreScore,
    signedToUserId: string[],
}

export interface ChoreDoneBy {
    choreId: string,
    // userId: string,
    memberId: string,
    date: string,
    score: number, // spara score här  ifall men justerar det senare
}

// ------------ MOCKED DATA BELOW -----------------

export const mockedMemberData: Member[] = [
    {
        id: '1',
        userId: '1',
        memberType: 'owner',
        avatar: '1',
        joinData: '2021-01-01',
        pausedHistory: [],
        householdId: '1'
    },
    {
        id: '2',
        userId: '2',
        memberType: 'member',
        avatar: '2',
        joinData: '2021-01-02',
        pausedHistory: [],
        householdId: '1'
    },
    {
        id: '3',
        userId: '2',
        memberType: 'owner',
        avatar: '7',
        joinData: '2021-01-02',
        pausedHistory: [],
        householdId: '2'
    }
];

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
                frequency: 3,
                score: 4,
                signedToUserId: ['1'],
                createdDate: '2021-10-01',
                lastDone: '2021-10-25',
                doneBy: [
                    {
                        choreId: '1',
                        memberId: '1',
                        date: '2021-10-12',
                        score: 4
                    }, {
                        choreId: '1',
                        memberId: '1',
                        date: '2021-10-23',
                        score: 4
                    }, {
                        choreId: '1',
                        memberId: '2',
                        date: '2021-10-25',
                        score: 4
                    }]
            },
            {
                id: '2',
                name: 'Koka kaffe',
                description: 'Koka kaffet snabbt så in i helvete annars blir jag GRINIG',
                frequency: 2,
                doneBy: [],
                score: 8,
                signedToUserId: [],
                createdDate: '2021-10-10'
            },
            {
                id: '3',
                name: 'Baka bröd',
                description: 'Kolla först i frysan och skafferiet vad som finns. Baka sedan valfri sort som räcker till veckan.',
                frequency: 7,
                doneBy: [],
                score: 8,
                signedToUserId: [],
                createdDate: '2021-10-24'
            },
            {
                id: '4',
                name: 'Byta sängkläder',
                description: 'Copy pasta lorem ipsum städa då snälla hjälp mig',
                frequency: 7,
                score: 4,
                signedToUserId: ['2'],
                createdDate: '2021-10-13',
                lastDone: '2021-10-18',
                doneBy: [
                    {
                        choreId: '1',
                        memberId: '2',
                        date: '2021-10-12',
                        score: 4
                    }, {
                        choreId: '1',
                        memberId: '2',
                        date: '2021-10-18',
                        score: 4
                    }]
            }]
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
                signedToUserId: [],
                createdDate: '2021-10-23'
            }
        ]
    }
];

export const mockedUserData: User[] = [
    {
        id: '1',
        email: 'svensson@mail.com',
        username: 'SvenSvensson',
        password: 'Svensson'
    },
    {
        id: '2',
        email: 'johansson@mail.com',
        username: 'JohanJohansson',
        password: 'Johansson'
    }
];

export const mockAvatarData: MemberAvatar[] = [
    {
        id: '1',
        avatar: '🦊',
        backgroundColor: '#FD7711'
    },
    {
        id: '2',
        avatar: '🐳',
        backgroundColor: '#00DCF4'
    },
    {
        id: '3',
        avatar: '🦑',
        backgroundColor: '#E17780'
    },
    {
        id: '4',
        avatar: '🐥',
        backgroundColor: '#FFFFA7'
    },
    {
        id: '5',
        avatar: '🐷',
        backgroundColor: '#D18D9E'
    },
    {
        id: '6',
        avatar: '🦁',
        backgroundColor: '#FFB31A'
    },
    {
        id: '7',
        avatar: '🐶',
        backgroundColor: '#A77731'
    },
    {
        id: '8',
        avatar: '🐭',
        backgroundColor: '#B3A7A9'
    },
    {
        id: '9',
        avatar: '🐹',
        backgroundColor: '#FFDD99'
    },
    {
        id: '10',
        avatar: '🐸',
        backgroundColor: '#70B65B'
    }
];