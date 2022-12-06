import { Component, OnInit } from '@angular/core';
import { Store } from "@ngrx/store";

import { AppState } from "../../states";
import { LoadUsersAccessAction } from "../../actions/users.action";
import { initialTestUsers } from "../../fixtures/user.fixtures";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.store.dispatch(new LoadUsersAccessAction(initialTestUsers));
  }
}
