import { Component, Input, OnInit } from '@angular/core';

import { User } from 'src/app/interfaces/users.interfaces';

@Component({
  selector: 'user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css'],
})
export class UserCardComponent implements OnInit {
  @Input() user: User | null = null;

  constructor() {}

  ngOnInit(): void {}
}
