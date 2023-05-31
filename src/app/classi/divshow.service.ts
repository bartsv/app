import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivshowService {
  private userSource = new BehaviorSubject<boolean>(null);
 sharedSearch = this.userSource.asObservable();
 constructor() { }
 getValues():Observable<boolean>{
   return this.sharedSearch
 }
 nextMessage( user: boolean): void {
   this.userSource.next(user);
 }
}
