import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Search } from './search';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private userSource = new BehaviorSubject<Search>(null);
 sharedSearch = this.userSource.asObservable();
 constructor() { }
 getValues():Observable<Search>{
   return this.sharedSearch
 }
 nextMessage( user: Search): void {
   this.userSource.next(user);
   console.log(user );
 }
}
