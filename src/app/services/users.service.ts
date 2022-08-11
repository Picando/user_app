import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import {
    CreateUserPayload,
    GetAllUsersAPIResponse,
    User,
} from '../interfaces/users.interfaces';

@Injectable({
    providedIn: 'root', // El servicio esta disponible en la raíz (en todos los componentes).
})
export class UsersService {
    constructor(private _http: HttpClient) {}

    /**
    * Obtiene todos los usuarios de la base de datos.
    */
    getAll(): Observable<GetAllUsersAPIResponse> {
        return this._http.get<GetAllUsersAPIResponse>(
            `${environment.apiUrl}/users`
        );
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     */
    create(payload: CreateUserPayload): Observable<User> {
        return this._http.post<User>(`${environment.apiUrl}/users`, payload);
    }
}
