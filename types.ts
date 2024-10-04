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
}