import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Points } from './points';

@Injectable({
  providedIn: 'root'
})
export class PointdbService {
  private userSource = new BehaviorSubject<Array<Points>>(null);
 sharedSearch = this.userSource.asObservable();
 constructor() { }
 getValues():Observable<Array<Points>>{
   return this.sharedSearch
 }
 nextMessage( user: Array<Points>): void {
   this.userSource.next(user);
   //console.log(JSON.stringify(user));
 }
}
