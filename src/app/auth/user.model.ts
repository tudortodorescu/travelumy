import { getUTCLocalDate } from "../shared/common";

export class User {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly id: string,
        private readonly _token: string,
        private readonly _tokenExpirationDate: Date
    ) {}

    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }

    get token(): string {
        if (!this._token) {
            return null;
        }

        if (!this._tokenExpirationDate || getUTCLocalDate() > this._tokenExpirationDate) {
            return null;
        }
        return this._token;
    }

    get isAuth(): boolean {
        return !!this.token;
    }

    get timeToExpiry() {
        return this._tokenExpirationDate.getTime() - getUTCLocalDate().getTime();
    }

}

export interface UserModel {
    firstName: string;
    lastName: string;
    email: string;
    id: string;
    _token: string;
    _tokenExpirationDate: Date;
}
