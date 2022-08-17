import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { User } from 'src/app/interfaces/users.interfaces';

import { UsersService } from 'src/app/services/users.service';
import { DEFAULT_USER } from 'src/app/shared/Utils/global.constants';
import {
  isValidNumber,
  showInvalidIdMessage,
} from 'src/app/shared/Utils/global.utils';
import _swal from 'sweetalert2';

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
      if (isValidNumber(x['id'])) {
        _usersService.get(x['id']).subscribe((u: User) => {
          this.user = u;
        });
      } else {
        showInvalidIdMessage();
      }
    });
  }

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
            this._router.navigate(['/']);
          });
        }
      });
  }
}
