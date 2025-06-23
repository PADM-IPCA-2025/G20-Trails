export class Participant {
    id:string;
    firstName: string;
    surname: string;
    mobilePhoneNumber: string;
    email: string;
    birthDate: Date;
    address: string;
    height: number;
    weight: number;
    municipality: string;
    region: string;
    country: string;
    gender: 'male' | 'female' | 'other';
    user: string;
    competitions?: string[];
}
