import { Component, EventEmitter, Input, Output } from '@angular/core';

import { Tools, UpdateAccessActionPayload } from "../../../models/access.model";
import { UserAccessState } from "../../../states/users.state";

@Component({
  selector: 'app-access-control',
  templateUrl: './access-control.component.html',
  styleUrls: ['./access-control.component.scss']
})
export class AccessControlComponent {
  @Input() userAccess!: UserAccessState;
  @Input() tool!: Tools;

  @Output() onAccessUpdate: EventEmitter<UpdateAccessActionPayload> = new EventEmitter();

  public updateAccess() {
    this.onAccessUpdate.emit({
      tool: this.tool,
      userId: this.userAccess.user.id,
    });
  }
}
