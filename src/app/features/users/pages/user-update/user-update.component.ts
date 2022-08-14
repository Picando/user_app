import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UpdatePayload } from 'src/app/interfaces/users.interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UserUpdateComponent implements OnInit {
  isLoading: boolean = false;
  userForm: FormGroup = this._fb.group({
    first_name: ['', [Validators.required]],
    last_name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private _fb: FormBuilder, private _userservice: UsersService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.isLoading = true;
    console.log({ values: this.userForm.value });
    const payload: UpdatePayload = this.userForm.value;
    this._userservice.user(payload).subscribe(
      (res: any) => {
        this.userForm.reset();
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
}
