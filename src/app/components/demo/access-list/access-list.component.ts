import { Component } from '@angular/core';

import { Access, UserAccess } from '../../../models/access.model';
import { User } from '../../../models/profile.model';
import { usersAccess } from "../../../fixtures";

@Component({
  selector: 'app-access-list',
  templateUrl: './access-list.component.html',
  styleUrls: ['./access-list.component.scss']
})
export class AccessListComponent {
  usersAccess: UserAccess[] = usersAccess;

  headings: string[] = [
    ...this.getUserFields(),
    ...(Object.keys(usersAccess[0].access) as Array<keyof Access>),
  ];

  private getUserFields(): string[] {
    const tempUser: Partial<User> = {...usersAccess[0].user};

    delete tempUser.id;

    return Object.keys(tempUser);
  }
}
