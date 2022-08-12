import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GetAllUsersAPIResponse,
  User,
} from 'src/app/interfaces/users.interfaces';
import { UsersService } from 'src/app/services/users.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<boolean>();

  userList: Array<User> = [];
  pagesList: Array<number> = [];
  page: number = 1;

  constructor(private _usersService: UsersService) {}

  ngOnInit(): void {
    this.getAllUsers();
  }
  ngOnDestroy(): void {
    this.destroy$.next(true);
  }
  private getAllUsers(): void {
    this._usersService
      .getAll(this.page)
      .pipe(takeUntil(this.destroy$))
      .subscribe((res: GetAllUsersAPIResponse) => {
        this.userList = res.data;
        this.pagesList = this.createPaginationArray(res.total_pages);
      });
  }
  private createPaginationArray(totalPages: number): Array<number> {
    let array = [];
    for (let i = 0; i < totalPages; i++) {
      array.push(i + 1);
    }
    return array;
  }
}
