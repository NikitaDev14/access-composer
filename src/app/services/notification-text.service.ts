import { Injectable } from "@angular/core";

import { Tools } from "../models/access.model";

@Injectable({
  providedIn: 'root',
})
export class NotificationTextService {
  public getClientAccessText(tool: Tools, isEnabled: boolean): string {
    return `The integration with ${tool} is ${isEnabled ? 'enabled' : 'disabled'}`;
  }

  public getUserAccessText(tool: Tools, userName: string, isEnabled: boolean): string {
    return `${userName} is ${isEnabled ? 'granted' : 'denied'} access to the ${tool}`;
  }
}
