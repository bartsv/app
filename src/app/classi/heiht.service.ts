import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Dimension } from './Dimension';

@Injectable({
  providedIn: 'root'
})
export class HeihtService {
  private userSource = new BehaviorSubject<Dimension>(null);
 sharedSearch = this.userSource.asObservable();
 constructor() { }
 getValues():Observable<Dimension>{
   return this.sharedSearch
 }
 nextMessage( user: Dimension): void {
   this.userSource.next(user);
   console.log(user );
 }
}
