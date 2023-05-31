
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSource = new BehaviorSubject<string>(null);
 sharedSearch = this.userSource.asObservable();
 constructor() { }
 getValues():Observable<string>{
   return this.sharedSearch
 }
 nextMessage( user: string): void {
   this.userSource.next(user);
 }
}
