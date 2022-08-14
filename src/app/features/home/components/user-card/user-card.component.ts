import { Component, Input, OnInit } from '@angular/core';
import _swal from 'sweetalert2'; // CommonJS

import { User } from 'src/app/interfaces/users.interfaces';
import { UsersService } from '../../../../services/users.service';

const DEFAULT_USER: User = {
    id: 0,
    first_name: 'Cristina',
    last_name: 'Galan',
    username: 'cristinag',
    email: 'cristina@test.com',
    image: 'https://i.pravatar.cc/500?u=debora.bandaalcala@peticiones.online',
};

@Component({
    selector: 'user-card',
    templateUrl: './user-card.component.html',
    styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
    @Input() user: User = DEFAULT_USER;

    constructor(private _usersService: UsersService) {}

    ngOnInit(): void {}

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
                    });
                }
            });
    }
}
