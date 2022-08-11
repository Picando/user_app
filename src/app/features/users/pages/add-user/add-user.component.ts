import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateUserPayload } from 'src/app/interfaces/users.interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnInit {
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
    const payload: CreateUserPayload = this.userForm.value;
    this._userservice.create(payload).subscribe(
      (res) => {
        this.userForm.reset();
        this.isLoading = false;
      },
      () => {},
      () => (this.isLoading = false)
    );
  }

  get getFirstName() {
    return this.userForm.get('first_name');
  }
  get getLastName() {
    return this.userForm.get('last_name');
  }
  get getEmail() {
    return this.userForm.get('email');
  }
}
