

export enum UiThemeColors {
    primary = '#ff8152',
    secondary = '#26c4eb',
    third = '#1183b0',
    white = '#ffffff',
    gray = '#858585'
}

export function getUTCLocalDate(target?: Date): Date {
    target = (!target) ? new Date() : target;
    const offset = target.getTimezoneOffset();
    const Y = target.getUTCFullYear();
    const M = target.getUTCMonth();
    const D = target.getUTCDate();
    const h = target.getUTCHours();
    const m = target.getUTCMinutes();
    const s = target.getUTCSeconds();

    return new Date(Date.UTC(Y, M, D, h, m + offset, s));
};

export const FIREBASE_API_KEY = 'AIzaSyB9TrLghrwxBYs8uVtmwJfN1JpCF6YJplY';
export const FIREBASE_API_URL = 'https://identitytoolkit.googleapis.com/v1/accounts';
export const FIREBASE_API_DB = 'https://travelumy.firebaseio.com';

export const UNKNOWN_ERROR_DEFAULT_MESSAGE = `OOOPS! Something bad happened. Don't worry our technical team will fix it soon.`;
