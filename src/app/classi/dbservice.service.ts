import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Point } from 'leaflet';
import { Users } from './User';
import { Points } from './points';
import { Commento } from './Commenti';


const headerb = new HttpHeaders()
  .append('Content-Type', 'application/x-www-form-urlencoded')
  .append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS')
  .append('Access-Control-Allow-Headers', 'Origin,X-Request-With,Content-Type,Accept')
  .append('Access-Control-Allow-Origin', '*');
const httpOptions = {
  headers: headerb
};
@Injectable({
  providedIn: 'root'
})
export class DBServiceService {
  private loginUrl = 'https://bartolomeoberrino.it/5cm/sito/';

  constructor(private http: HttpClient) { }
  resetPassword(email: string,psw:string,cpsw:string,code:string) {
    var formData = new FormData();
    formData.append('val','RPass')
    formData.append('code',code)
    formData.append('email',email)
    formData.append('password',psw)
    formData.append('password_confirmation',cpsw)
    return this.http.post(
     this.loginUrl + 'User.php',
      formData
    );
  }
  resetPasswordLOGIN(psw:string,cpsw:string) {
    var formData = new FormData();
    formData.append('password',psw)
    formData.append('password_confirmation',cpsw)
    return this.http.post(
      'http://127.0.0.1:8000/api/v1/updatep',
      formData
    );
  }
  changeAvatarLOGIN(image:string) {
    var formData = new FormData();
    formData.append('val','UAvatar')
    formData.append('image',image)
    return this.http.post(
      this.loginUrl + 'User.php',
      formData
    );
  }
  checkCode(code:string) {
    var formData = new FormData();
    formData.append('code',code)
    return this.http.post('http://127.0.0.1:8000/api/password/code/check', formData)
  }
  sendResetPasswordLink(email:string) {
    var formData = new FormData();
    formData.append('val','FPass')
    formData.append('email',email)
    return this.http.post(
      this.loginUrl + 'User.php',
      formData
    );
  }
  Register(user:Users,image:string){
    var formData = new FormData();
    formData.append('User',JSON.stringify(user));
    formData.append('val', 'add');
    formData.append('image',image)
    //console.log(JSON.stringify(user))
    return this.http.post( 'User.php', formData);
  }
  Login(user:Users){
    var formData = new FormData();//console.log(JSON.stringify(user));
    formData.append('User',JSON.stringify(user));
    formData.append('val', 'login');
    return this.http.post(this.loginUrl+'User.php', formData);
  }
  LoginG(user:Users){
    var formData = new FormData();
    formData.append('User',JSON.stringify(user));
    formData.append('val', 'loginG');
    return this.http.post(this.loginUrl+'User.php', formData);
  }
  getPuntiGR( SW : any,NE:any ): Observable<any>{
    const url = 'https://www.overpass-api.de/api/interpreter?data=[out:json];(way["leisure"="beach_resort"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="post_office"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["leisure"="park"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["leisure"="sport_centre"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["office"="government"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="pharmacy"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="cinema"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="school"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="restaurant"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="university"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="bakery"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="butcher"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="frozen_food"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="greengrocer"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="pasta"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="shoes"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="outdoor"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="clothes"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="supermarket"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="seafood"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="pastry"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="ice_cream"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["shop"="deli"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["tourism"="hotel"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["tourism"="museum"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="bar"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="library"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+');node["amenity"="bank"]('+SW.lat+','+SW.lng+','+NE.lat+','+NE.lng+'););out body;>;out skel qt;'
  //   //console.log(url)
    return this.http.get(url, httpOptions );
  }
  getPunti( SW : any,NE:any ): Observable<any>{
    const formData = new FormData();
    formData.append('latSW', SW.lat )
    formData.append('lonSW', SW.lng);
    formData.append('latNE', NE.lat);
    formData.append('lonNE', NE.lng);
    console.log(SW.lat+','+SW.lng+','+NE.lat+','+NE.lng)
    return this.http.post(this.loginUrl+'Point.php', formData);
  }
  UpdatePoint(p:Points,image:string){
    const formData = new FormData();
    formData.append('point',JSON.stringify(p))
    formData.append('image', image);
    return this.http.post(this.loginUrl+'UpdatePoint.php', formData);
  }
  SavePoint(p:Points,image:string){
    const formData = new FormData();
    console.log(JSON.stringify(p))
    formData.append('point',JSON.stringify(p))
    formData.append('image', image);
    return this.http.post( this.loginUrl+'AddPoint.php', formData);
  }
  AddPhoto(id:number,image:File){
    const formData = new FormData();
    formData.append('id',id+'')
    formData.append('image',image)
    return this.http.post(this.loginUrl+'AddPhoto.php', formData);
  }
  SaveComment(p:Commento){
    const formData = new FormData();
    formData.append('Comment',JSON.stringify(p))
    console.log(JSON.stringify(p))
    return this.http.post(this.loginUrl+'AddComment.php', formData);
  }
  DeletCommento(idC:number,idP:number){
    const formData = new FormData();
    formData.append('idC',idC+'')
    formData.append('idP',idP+'')
    return this.http.post(this.loginUrl+'delComment.php', formData);
  }
  getPointAddress(lat:number,lon:number){
    const url='https://nominatim.openstreetmap.org/reverse?lat='+lat+'&lon='+lon+'&format=json'
    console.log(url)
    return this.http.get(url, httpOptions );
  }
  getPointCoordinate(q:string){
    const url='https://nominatim.openstreetmap.org/search?q='+q+ '&format=json'
    return this.http.get(url, httpOptions );
  }
/*  removePoint(user: {mailA: string; pswA: string, idP: number}): Observable<any>{
    const url = this.loginUrl + 'add.php';
    const params = new URLSearchParams();
    params.append('id', String(user.idP));
    params.append('emailA', user.mailA);
    params.append('pswA', user.pswA);
    params.append('var', 'remP');
    return this.http.post(url, params.toString(), httpOptions );
  }
  getCittaLatLong( citta: string): Observable<any>{
    const url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + citta + '&key=AIzaSyC0AXcdmAVJx5bASHBFN91zp90rUy54GIU&sensor=true';
    //console.log(url);
    return this.http.get(url, httpOptions );
  }
  cercaLocCitta(user: {mailA: string; pswA: string}, search: Search): Observable<any>{
    const url = this.loginUrl + 'add.php';
    const params = new URLSearchParams();
    params.append('emailA', user.mailA);
    params.append('pswA', user.pswA);
    params.append('lat', String(search.LAT));
    params.append('lng', String(search.LONG));
    params.append('cat', search.CAT);
    params.append('km', String(search.KM));
    params.append('var', 'cercaP');
    //console.log(params.toString());
    return this.http.post(url, params.toString(), httpOptions );
  }*/
}
