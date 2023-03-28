import { atom } from 'recoil';

export type UserRecoilType = {
    email: string;
    password: string;
    pin: string;
    phone: string;
    total: number
}

export const userState = atom<UserRecoilType>({
    key: 'user',
    default: {
        email: '',
        password: '',
        pin: '',
        phone: '',
        total: 0
    }
});