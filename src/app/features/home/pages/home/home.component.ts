import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import {
  GetAllUsersAPIResponse,
  User,
} from 'src/app/interfaces/users.interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  usersList: Array<User> = [];

  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
  }

  private getAllUsers(): void {
    this._usersService
      .getAllUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: GetAllUsersAPIResponse) => {
        this.usersList = res.data;
      });
  }
}
