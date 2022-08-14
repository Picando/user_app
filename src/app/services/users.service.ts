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
  providedIn: 'root', // El servicio esta disponible en todos los componentes ( en la raiz)
})
export class UsersService {
  constructor(private http: HttpClient) {} // injeccion de dependecia para poder tener acceso al codigo que me permita realizar una peticion... no voy a usar el fetch. usaré el modulo http client.

  /* Obtiene la información del usuario con el Id especificado. */

  get(id: number): Observable<User> {
    // es un método.
    return this.http.get<User>(`${environment.apiUrl}/users/${id}`);
  }

  /* obtiene todos los usuarios de la base de datos */

  getAll(page: number): Observable<GetAllUsersAPIResponse> {
    return this.http.get<GetAllUsersAPIResponse>(
      `${environment.apiUrl}/users?page=${page}`
    );
  }

  /* Crea un nuevo usuario */

  create(payload: CreateUserPayload): Observable<User> {
    return this.http.post<User>(`${environment.apiUrl}/users`, payload);
  }

  /* Elimina un usuario en la base de datos */

  delete(userId: number): Observable<User> {
    return this.http.delete<User>(`${environment.apiUrl}/users/${userId}`);
  }

  /* Actualiza el usuario que corresponda con el Id especificado */

  update(userId: number, payload: User): Observable<User> {
    return this.http.put<User>(
      `${environment.apiUrl}/users/${userId}`,
      payload
    );
  }
}
