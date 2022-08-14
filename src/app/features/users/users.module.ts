import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';

@NgModule({
    declarations: [AddUserComponent, UserDetailsComponent, UserUpdateComponent],
    imports: [CommonModule, ReactiveFormsModule, UsersRoutingModule],
})
export class UsersModule {}
