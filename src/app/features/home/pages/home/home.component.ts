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

    page: number = 1;
    pagesList: Array<number> = [];
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
            .getAll(this.page)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res: GetAllUsersAPIResponse) => {
                this.usersList = res.data;
                this.pagesList = this.createPaginationArray(res.total_pages);
            });
    }

    /*
     *  Cuando declaramos una variable con "const", esa variable no puede ser reasignada,
     *  pero, su valor no es inmutable, esto pasa generalmente con los objetos y los arrays,
     *  dado que, contienen metodos heredados que pueden mutar el valor original de la variable.
     *
     *  Ejemplo:
     *  const testList: Array<number> = [];
     *
     *  testList = [0]; // No podemos modificar su valor de esta manera, dado que es deberia
     *                  // ser una variable de solo lectura.
     *
     *  // Pero, si hacemos lo siguiente:
     *  testList.push(0) // -> testList = [0]; , mutamos el array original.
     */

    /*
     * Pasar una variable por referencia vs pasar una variable por valor:
     *
     * Los tipos de dato que no son primitivos, se pasan por referencia, y los primitivos se pasan
     * por valor. Tambien hay que tener en consideracion que los tipos de datos que no sean primitivos
     * no se comparan por valor, es decir:
     * const object1 = { key: '1' };
     * const object2 = { key: '1' };
     *
     * object1 === object2 // false
     *
     */

    private createPaginationArray(totalPages: number): Array<number> {
        let array: Array<number> = [];

        for (let i = 0; i < totalPages; i++) {
            array = [...array, i + 1];
        }

        return array;
    }

    navigateToPage(page: number): void {
        this.page = page;
        this.getAllUsers();
    }
}
