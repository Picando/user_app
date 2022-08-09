import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { GetAllUsersAPIResponse } from '../interfaces/users.interfaces';

@Injectable({
  providedIn: 'root', // El servicio esta disponible en la raíz (en todos los componentes).
})
export class UsersService {
  constructor(private _http: HttpClient) {}

  getAllUsers(): Observable<GetAllUsersAPIResponse> {
    return this._http.get<GetAllUsersAPIResponse>(
      'https://peticiones.online/api/users'
    );
  }
}
