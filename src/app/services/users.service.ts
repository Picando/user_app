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
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {} // injeccion de dependecia para poder tener acceso al codigo que nos permita realizar una peticion... no voy a usar el fetch. usaré el modulo http client.

  getAll(page: number): Observable<GetAllUsersAPIResponse> {
    // es un método.
    return this.http.get<GetAllUsersAPIResponse>(
      `${environment.apiUrl}/users?page=${page}`
    );
  }

  create(payload: CreateUserPayload): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, payload);
  }
}
