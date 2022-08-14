import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User = DEFAULT_USER;

  constructor(
    private _usersService: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
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
      'Id Invalido',
      'El ID que ha ingresado no pertenece a un ID de usuario válido. Verifique la ruta y vuelva a intentarlo',
      'error'
    );
  }

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
            this._router.navigate(['/']);
          });
        }
      });
  }
}
