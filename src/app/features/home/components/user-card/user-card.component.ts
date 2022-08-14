import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interfaces';
import { UsersService } from 'src/app/services/users.service';
import _swal from 'sweetalert2';

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

  // el guion bajo: el metodo no pertenece a la clase en la que estoy trabajando.

  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {}

  deleteUser(userId: number): void {
    _swal
      .fire({
        title: 'Eliminar Usuario',
        text: '¿Está seguro que desea eliminar el usuario?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          this._usersService.delete(userId!).subscribe(() => {
            _swal.fire(
              'Eliminado',
              'Usuario eliminado correctamente',
              'success'
            );
          });
        }
      });
  }
}
