export interface Profile {

    _id: string;
    name: string;
    age: string;
    email: string;
    mobile: string;
    address: string;
    adharCardNumber: number;
    password: string;
    role: string
    isVoted: boolean
}

export interface CandidateInfo {
    _id: string;
    name: string;
    party: string;
    votes: {
        user: string;
        votedAt: string;
        _id: string;
    }[]
}

export interface PartyVote {
    party: string;
    count: number;
}