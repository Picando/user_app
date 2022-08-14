import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './pages/home/home.component';
import { UserCardComponent } from './components/user-card/user-card.component';

@NgModule({
    declarations: [HomeComponent, UserCardComponent],
    imports: [CommonModule, HomeRoutingModule],
    providers: [],
})
export class HomeModule {}
