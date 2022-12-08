import { Injectable } from "@angular/core";
import { BehaviorSubject, delay, from, Observable, switchMap } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications: BehaviorSubject<string[]> = new BehaviorSubject([] as string[]);

  constructor() {
    this.notifications.pipe(
      switchMap((notifications: string[]) => {
        return from(notifications).pipe(
          delay(4000),
        );
      }),
    ).subscribe(() => {
      if (this.notifications.getValue().length) {
        this.notifications.next(this.notifications.getValue().slice(1));
      }
    });
  }

  public getNotifications(): Observable<string[]> {
    return this.notifications.asObservable();
  }

  public showNotification(text: string) {
    this.notifications.next(
      [...this.notifications.getValue(), text],
    );
  }
}
