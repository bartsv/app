import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Points } from './points';

@Injectable({
  providedIn: 'root'
})
export class PuntoService {
  private userSource = new BehaviorSubject<Points>(null);
 sharedSearch = this.userSource.asObservable();
 constructor() { }
 getValues():Observable<Points>{
   return this.sharedSearch
 }
 nextMessage( user: Points): void {
   this.userSource.next(user); 
   console.log(user );
 }
}
