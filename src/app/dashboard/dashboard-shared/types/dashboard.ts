export interface Error {
    type: string;
    message: string;
    status: boolean;
}
export interface OverviewCard {
    type: string;
    color: string;
    icon: string;
    category: string;
    title: string;
    footer: any;
}
export interface UserList {
    name: string;
    uniqueId: string;
    userId: string;
    email: string;
    age: string;
    date: string;
    verified: boolean;
    private: boolean;
    properties: number;
    claimed: number;
}
export interface PropertyThumb {
    title: string;
    thumb: string;
    id: string;
    url: string;
    claimed: number;
}
