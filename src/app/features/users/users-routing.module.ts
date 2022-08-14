import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddUserComponent } from './pages/add-user/add-user.component';
import { UserDetailsComponent } from './pages/user-details/user-details.component';
import { UserUpdateComponent } from './pages/user-update/user-update.component';

const routes: Routes = [
    {
        path: 'newuser',
        component: AddUserComponent,
    },
    {
        path: 'user/:id',
        component: UserDetailsComponent,
    },
    {
        path: 'updateuser/:id',
        component: UserUpdateComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UsersRoutingModule {}
