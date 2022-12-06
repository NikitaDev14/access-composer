import { Injectable } from "@angular/core";
import { delay, Observable, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccessService {
  public updateAccess(): Observable<boolean> {
    return of(true).pipe(
      delay(1000),
    );
  }
}
