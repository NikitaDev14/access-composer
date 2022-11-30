import { Component } from '@angular/core';
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { AppState } from "../../states";
import { selectIsClientInitialized } from "../../selectors";

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.scss']
})
export class DemoComponent {
  public isClientInitialized$!: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
  ) { }

  ngOnInit() {
    this.isClientInitialized$ = this.store.select(selectIsClientInitialized);
  }
}
