export interface Area {
    id: number;
    name: string;
    code: string;
    flag: string;
}

export interface Season {
    id: number;
    startDate: string;
    endDate: string;
    currentMatchday: number;
    winner: Winner | null;
}

export interface Winner {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
    lastUpdated: string;
}

export interface Competition {
    id: number;
    area: Area;
    name: string;
    code: string | null;
    type: string;
    emblem: string | null;
    plan: string;
    currentSeason: Season;
    numberOfAvailableSeasons: number;
    lastUpdated: string;
}

export interface LeagueDetails {
    season: {
        id: number;
        startDate: string;
        endDate: string;
        currentMatchday: number;
    };
    standings: [
        {
            table: [
                {
                    position: number;
                    team: Team;
                    playedGames: number;
                    won: number;
                    draw: number;
                    lost: number;
                    points: number;
                    goalsFor: number;
                    goalsAgainst: number;
                    goalDifference: number;
                }
            ];
        }
    ];
}

export interface Team {
    id: number;
    name: string;
    shortName: string;
    tla: string;
    crest: string;
    address: string;
    website: string;
    founded: number;
    clubColors: string;
    venue: string;
}

export interface Player {
    id: number;
    name: string;
    position: string;
    nationality: string;
    dateOfBirth: string;
}

export interface Contract {
    start: string;
    until: string;
}

export interface TeamDetails extends Team {
    phone: string;
    email: string;
    squad: Player[];
    runningCompetitions: Competition[];
    coach: Coach;
    marketValue: number;
    staff: Staff[];
    lastUpdated: string;
}

export interface Coach {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    contract: Contract;
}

export interface Staff {
    id: number;
    firstName: string;
    lastName: string;
    name: string;
    dateOfBirth: string;
    nationality: string;
    contract: Contract;
}
