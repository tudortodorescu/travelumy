import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

export interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
}

@Injectable()
export class RegisterService {
    private _registerData = new BehaviorSubject<RegisterData>(null);

    get registerData() {
        return this._registerData.asObservable();
    }

    setRegisterData(registerData: RegisterData | null) {
        this._registerData.next(registerData);
    }
}
