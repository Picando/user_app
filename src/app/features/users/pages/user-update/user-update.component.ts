import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UpdatePayload, User } from 'src/app/interfaces/users.interfaces';
import { UsersService } from 'src/app/services/users.service';
import { DEFAULT_USER } from 'src/app/shared/Utils/global.constants';
import {
  isValidNumber,
  showInvalidIdMessage,
} from 'src/app/shared/Utils/global.utils';
import _swal from 'sweetalert2';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  user: User = DEFAULT_USER;

  isLoading: boolean = false;
  userForm: FormGroup = this._fb.group({
    first_name: [''],
    last_name: [''],
    email: [''],
  });

  constructor(
    private _fb: FormBuilder,
    private _userService: UsersService,
    private _activatedRoute: ActivatedRoute,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this._activatedRoute.params.subscribe((x) => {
      if (isValidNumber(x['id'])) {
        this._userService.get(x['id']).subscribe((u: User) => {
          this.user = u;
          const formValue = {
            first_name: u.first_name,
            last_name: u.last_name,
            email: u.email,
          };
          this.userForm.setValue(formValue);
        });
      } else {
        showInvalidIdMessage();
      }
    });
  }

  onSubmit(): void {
    this.isLoading = true;
    console.log({ values: this.userForm.value });
    const payload = this.userForm.value;
    this._userService.update(this.user.id, payload).subscribe(
      () => {
        this._router.navigate(['/']);
        this.isLoading = false;
      },
      () => {},
      () => (this.isLoading = false)
    );
  }

  // form getters

  get getFirstName() {
    return this.userForm.get('first_name');
  }
  get getLastName() {
    return this.userForm.get('last_name');
  }
  get getEmail() {
    return this.userForm.get('email');
  }

  //input validaciones (!!boleano es un falso)

  isInvalidFirstName(): boolean {
    return !!(
      this.getFirstName?.invalid &&
      (this.getFirstName?.touched || this.getFirstName?.dirty)
    );
  }

  isInvalidLastName(): boolean {
    return !!(
      this.getLastName?.invalid &&
      (this.getLastName?.touched || this.getLastName?.dirty)
    );
  }
  isInvalidEmail(): boolean {
    return !!(
      this.getEmail?.invalid &&
      (this.getEmail?.touched || this.getEmail?.dirty)
    );
  }
  private ShowUpdateMessage(): void {
    _swal.fire('Actualizado', 'Usuario actualizado correctamente', 'success');
  }
}
