import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  public updateAccess(delayTime: number = 1000): Observable<boolean> {
    return of(true).pipe(
      delay(delayTime),
    );
  }
}
