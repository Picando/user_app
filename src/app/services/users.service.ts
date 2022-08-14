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
     * Obtiene la informacion del usuario con el id especificado.
     */
    get(id: number): Observable<User> {
        return this._http.get<User>(`${environment.apiUrl}/users/${id}`);
    }

    /**
     * Obtiene todos los usuarios de la base de datos.
     */
    getAll(page: number): Observable<GetAllUsersAPIResponse> {
        return this._http.get<GetAllUsersAPIResponse>(
            `${environment.apiUrl}/users?page=${page}`
        );
    }

    /**
     * Crea un nuevo usuario en la base de datos.
     */
    create(payload: CreateUserPayload): Observable<User> {
        return this._http.post<User>(`${environment.apiUrl}/users`, payload);
    }

    /**
     * Actualiza el usuario que corresponda con el Id especificado.
     */
    update(userId: number, payload: User): Observable<User> {
        return this._http.put<User>(
            `${environment.apiUrl}/users/${userId}`,
            payload
        );
    }

    /**
     * Elimina un usuario en la base de datos.
     */
    delete(userId: number): Observable<User> {
        return this._http.delete<User>(`${environment.apiUrl}/users/${userId}`);
    }
}
