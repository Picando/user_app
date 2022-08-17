import { Component, OnInit } from '@angular/core';
import _swal from 'sweetalert2';

import { UsersService } from '../../../../services/users.service';
import { User } from '../../../../interfaces/users.interfaces';
import { ActivatedRoute, Router } from '@angular/router';

/*
 *   Las rutas pueden contener, tanto 'params' como 'queryParams'.
 *   Estos tienen la siguiente forma:
 *
 *   jacintoaczz.com/param?queryParam=valor1&queryParam=valor2
 */

const DEFAULT_USER: User = {
    id: 0,
    first_name: 'Cristina',
    last_name: 'Galan',
    username: 'cristinag',
    email: 'cristina@test.com',
    image: 'https://i.pravatar.cc/500?u=debora.bandaalcala@peticiones.online',
};

@Component({
    selector: 'app-user-details',
    templateUrl: './user-details.component.html',
    styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
    user: User = DEFAULT_USER;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _router: Router,
        private _usersService: UsersService
    ) {
        _activatedRoute.params.subscribe((x) => {
            if (this.isValidNumber(x['id'])) {
                _usersService.get(x['id']).subscribe((u: User) => {
                    this.user = u;
                });
            } else {
                this.showInvalidIdMessage();
            }
        });
    }

    ngOnInit(): void {}

    private isValidNumber(numberString: string) {
        return !isNaN(parseInt(numberString));
    }

    private showInvalidIdMessage(): void {
        _swal.fire(
            'Id invalido.',
            'El Id que ha ingresado no pertenece a un Id de usuario valido. Por favor, verifique la ruta, y vuelva a intentar.',
            'error'
        );
    }

    deleteUser(userId: number): void {
        _swal
            .fire({
                title: 'Eliminar usuario',
                text: 'Esta seguro que desea eliminar el usuario?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, eliminar',
            })
            .then((result) => {
                if (result.isConfirmed) {
                    this._usersService.delete(userId).subscribe(() => {
                        _swal.fire(
                            'Eliminado!',
                            'Usuario eliminado exitosamente.',
                            'success'
                        );

                        this._router.navigate(['/']);
                    });
                }
            });
    }
}
