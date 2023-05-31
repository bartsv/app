import { Component, Input, AfterViewInit, OnChanges, Output, EventEmitter, HostListener, ElementRef, ViewChild } from '@angular/core';
import * as L from 'leaflet';
import { UntypedFormArray, UntypedFormBuilder, UntypedFormControl, Validators } from '@angular/forms';
import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';
import { UserService } from '../classi/user.service';
import { DivshowService } from '../classi/divshow.service';
import { Points } from '../classi/points';
import { PuntoService } from '../classi/punto.service';
import { DBServiceService } from '../classi/dbservice.service';
import { PointService } from '../classi/point.service';
import { DivshowaddService } from '../classi/divshowadd.service';
import { DivshowAddCommentService } from '../classi/divshow-add-comment.service';
import { Commento } from '../classi/Commenti';
import { PointdbService } from '../classi/pointdb.service';
import { SearchService } from '../classi/search.service';
import { Dimension } from '../classi/Dimension';
import { HeihtService } from '../classi/heiht.service';
import { ModPointService } from '../classi/mod-point.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
function compressImage(src, newX, newY) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = newX;
      elem.height = newY;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, newX, newY);
      const data = ctx.canvas.toDataURL();
      res(data);
    }
    img.onerror = error => rej(error);
  })
}
@Component({
  selector: 'app-mappa',
  templateUrl: './mappa.component.html',
  styleUrls: ['./mappa.component.css']
})
export class MappaComponent implements AfterViewInit {
  nome!: string;
  icon!: string;
  layerGroup: L.LayerGroup = L.layerGroup();
  Fonti = [
    {"val":"g","nome":'Pienamente Accessibile'},
    {"val":"y","nome":'Parzialmente Accessibile'},
    {"val":"r","nome":'Non Accessibile'}
    ];
  aggiorna!: string;
  LoginOK=false;
  private map
  RankAdd1="assets/gr.png";
  RankAdd2="assets/gr.png";
  RankAdd3="assets/gr.png";
  RankAdd4="assets/gr.png";
  RankAdd5="assets/gr.png";
  RankAdd=0;
  RankAddC=0;
  reactiveFormAddC: any;
  NomeControl: any;
  changeAddR1(){
    let v=this.FonteControl.value
    this.RankAdd=1
    if(v=='g'){
      this.RankAdd1="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1="assets/r.png";
    }
    this.RankAdd2="assets/gr.png";
    this.RankAdd3="assets/gr.png";
    this.RankAdd4="assets/gr.png";
    this.RankAdd5="assets/gr.png";
  }
  changeAddR2(){
    this.RankAdd=2
    let v=this.FonteControl.value
    ////console.log('qq2 '+v)
    if(v=='g'){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
    }
    this.RankAdd3="assets/gr.png";
    this.RankAdd4="assets/gr.png";
    this.RankAdd5="assets/gr.png";
  }
  changeAddR3(){
    this.RankAdd=3
    let v=this.FonteControl.value
    if(v=='g'){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
    }
    this.RankAdd4="assets/gr.png";
    this.RankAdd5="assets/gr.png";
  }
  changeAddR4(){
    let v=this.FonteControl.value
    this.RankAdd=4
    if(v=='g'){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
      this.RankAdd4="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
      this.RankAdd4="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
      this.RankAdd4="assets/r.png";
    }
    this.RankAdd5="assets/gr.png";
  }
  changeAddR5(){
    let v=this.FonteControl.value
    this.RankAdd=5
    if(v=='g'){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
      this.RankAdd4="assets/g.png";
      this.RankAdd5="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
      this.RankAdd4="assets/y.png";
      this.RankAdd5="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
      this.RankAdd4="assets/r.png";
      this.RankAdd5="assets/r.png";
    }
  }


  Rampa='assets/rampa_off.png'
  MMScale='assets/montascale_off.png'
  Ascensore='assets/ascensore_off.png'
  WC='assets/wc_off.png'
  Parking='assets/parcheggio_off.png'
  accessibility = Array<string>();
  AddAccess(val:string){
    var b=this.accessibility.includes(val)
    if(!b){
      if(val==='rampa'){
        this.Rampa='assets/rampa_on.png';
      }
      if(val==='ascensore'){
        this.Ascensore='assets/ascensore_on.png';
      }
      if(val==='wc'){
        this.WC='assets/wc_on.png';
      }
      if(val==='parking'){
        this.Parking='assets/parcheggio_on.png';
      }
      if(val==='montascale'){
        this.MMScale='assets/montascale_on.png'
      }
        this.accessibility.push(val)
    }
    else{
      if(val==='ascensore'){
        this.Ascensore='assets/ascensore_off.png';
      }
      if(val==='wc'){
        this.WC='assets/wc_off.png';
      }
      if(val==='parking'){
        this.Parking='assets/parcheggio_off.png';
      }
      if(val==='montascale'){
        this.MMScale='assets/montascale_off.png'
      }
      if(val==='rampa'){
        this.Rampa='assets/rampa_off.png'
      }
        const index: number = this.accessibility.indexOf(val);
        if (index !== -1) {
            this.accessibility.splice(index, 1);
        }
    }
  }

  setService(){
    let service=this.Point.service
    this.accessibilityM=service.split(',')
    if(service.includes('rampa')){
      this.RampaM='assets/rampa_on.png';
    }
    if(service.includes('ascensore')){
      this.AscensoreM='assets/ascensore_on.png';
    }
    if(service.includes('wc')){
      this.WCM='assets/wc_on.png';
    }
    if(service.includes('parcheggio')){
      this.ParkingM='assets/parcheggio_on.png';
    }
    if(service.includes('montascale')){
      this.MMScaleM='assets/montascale_on.png'
    }
  }

  RampaM='assets/rampa_off.png'
  MMScaleM='assets/montascale_off.png'
  AscensoreM='assets/ascensore_off.png'
  WCM='assets/wc_off.png'
  ParkingM='assets/parcheggio_off.png'
  accessibilityM = Array<string>();
  AddAccessM(val:string){
    var b=this.accessibilityM.includes(val)
    if(!b){
      if(val==='rampa'){
        this.RampaM='assets/rampa_on.png';
      }
      if(val==='ascensore'){
        this.AscensoreM='assets/ascensore_on.png';
      }
      if(val==='wc'){
        this.WCM='assets/wc_on.png';
      }
      if(val==='parking'){
        this.ParkingM='assets/parcheggio_on.png';
      }
      if(val==='montascale'){
        this.MMScaleM='assets/montascale_on.png'
      }
        this.accessibilityM.push(val)
    }
    else{
      if(val==='ascensore'){
        this.AscensoreM='assets/ascensore_off.png';
      }
      if(val==='wc'){
        this.WCM='assets/wc_off.png';
      }
      if(val==='parking'){
        this.ParkingM='assets/parcheggio_off.png';
      }
      if(val==='montascale'){
        this.MMScaleM='assets/montascale_off.png'
      }
      if(val==='rampa'){
        this.RampaM='assets/rampa_off.png'
      }
        const index: number = this.accessibilityM.indexOf(val);
        if (index !== -1) {
            this.accessibilityM.splice(index, 1);
        }
    }
  }

  RankAdd1C="assets/gr.png";
  RankAdd2C="assets/gr.png";
  RankAdd3C="assets/gr.png";
  RankAdd4C="assets/gr.png";
  RankAdd5C="assets/gr.png";
  changeAddR1C(){
    let v=this.Point.access
    this.RankAddC=1
    if(v=='g'){
      this.RankAdd1C="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1C="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1C="assets/r.png";
    }
    this.RankAdd2C="assets/gr.png";
    this.RankAdd3C="assets/gr.png";
    this.RankAdd4C="assets/gr.png";
    this.RankAdd5C="assets/gr.png";
  }
  changeAddR2C(){
    this.RankAddC=2
    let v=this.Point.access
    if(v=='g'){
      this.RankAdd1C="assets/g.png";
      this.RankAdd2C="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1C="assets/y.png";
      this.RankAdd2C="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1C="assets/r.png";
      this.RankAdd2C="assets/r.png";
    }
    this.RankAdd3C="assets/gr.png";
    this.RankAdd4C="assets/gr.png";
    this.RankAdd5C="assets/gr.png";
  }
  changeAddR3C(){
    this.RankAddC=3
    let v=this.Point.access
    if(v=='g'){
      this.RankAdd1C="assets/g.png";
      this.RankAdd2C="assets/g.png";
      this.RankAdd3C="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1C="assets/y.png";
      this.RankAdd2C="assets/y.png";
      this.RankAdd3C="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1C="assets/r.png";
      this.RankAdd2C="assets/r.png";
      this.RankAdd3C="assets/r.png";
    }
    this.RankAdd4C="assets/gr.png";
    this.RankAdd5C="assets/gr.png";
  }
  changeAddR4C(){
    let v=this.Point.access
    this.RankAddC=4
    if(v=='g'){
      this.RankAdd1C="assets/g.png";
      this.RankAdd2C="assets/g.png";
      this.RankAdd3C="assets/g.png";
      this.RankAdd4C="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1C="assets/y.png";
      this.RankAdd2C="assets/y.png";
      this.RankAdd3C="assets/y.png";
      this.RankAdd4C="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1C="assets/r.png";
      this.RankAdd2C="assets/r.png";
      this.RankAdd3C="assets/r.png";
      this.RankAdd4C="assets/r.png";
    }
    this.RankAdd5C="assets/gr.png";
  }
  changeAddR5C(){
    let v=this.Point.access
    this.RankAddC=5
    if(v=='g'){
      this.RankAdd1C="assets/g.png";
      this.RankAdd2C="assets/g.png";
      this.RankAdd3C="assets/g.png";
      this.RankAdd4C="assets/g.png";
      this.RankAdd5C="assets/g.png";
    }
    if(v=='y'){
      this.RankAdd1C="assets/y.png";
      this.RankAdd2C="assets/y.png";
      this.RankAdd3C="assets/y.png";
      this.RankAdd4C="assets/y.png";
      this.RankAdd5C="assets/y.png";
    }
    if(v=='r'){
      this.RankAdd1C="assets/r.png";
      this.RankAdd2C="assets/r.png";
      this.RankAdd3C="assets/r.png";
      this.RankAdd4C="assets/r.png";
      this.RankAdd5C="assets/r.png";
    }
  }







  RankMod1="assets/gr.png";
  RankMod2="assets/gr.png";
  RankMod3="assets/gr.png";
  RankMod5="assets/gr.png";
  RankMod4="assets/gr.png";
  Punti:Array<Points>;
  LATCitta!: number;fileName!: string;
  LNGCitta!: number;
  Point!: Points;
  PointsCercati =  Array<Points>();
  ADRESSControl: any; PHONEControl: any; WControl: any;
  RankkkControl: any;CITTAControl:any;COUNTRYControl:any;
  ADRESSMControl: any; PHONEMControl: any; WMControl: any;
  CITTAMControl:any;COUNTRYMControl:any;
  FonteMControl: any;
  isShown: boolean = false ;
  isShownAdd: boolean = false ;
  reactiveFormInfoCard: any;
  reactiveFormInfoMCard: any;
  user!: string;
  screenHeight: number;
  screenWidth: number;
  FonteControl: any;
  closeModal: string;
  CommentoControl: any;
  AddCommentoControl: any;
  @HostListener('window:resize', ['$event'])
onResize(event) {
  this.screenWidth = event.target.innerWidth;
  this.screenHeight = event.target.innerHeight-39;
  var def:Dimension=new Dimension(this.screenHeight,this.screenWidth)
  this.Dim.nextMessage(def)
}
@ViewChild('buttonToBeClickedComment') buttonToBeClickedComment: ElementRef;
@ViewChild('buttonToBeClickedMod') buttonToBeClickedMod: ElementRef;
@ViewChild('buttonToBeClickedCommentClose') buttonToBeClickedCommentClose: ElementRef;
@ViewChild('buttonToBeClicked') buttonToBeClicked: ElementRef;
@ViewChild('buttonToBeClickedMP') buttonToBeClickedMP: ElementRef;
@ViewChild('buttonToBeClickedAddP') buttonToBeClickedAddP: ElementRef;
isCalendario=1
getDetail(){
  this.isCalendario=1
}
getPhoto(){
  this.isCalendario=2
}
getCommenti(){
  this.isCalendario=3
}
  constructor(private users: UserService, private divS: DivshowService,private divSADD: DivshowaddService, private PUN : PuntoService,private ListaPunti:PointService,private ListaPuntiDB:PointdbService,
              private DBService: DBServiceService, private formBuilder: UntypedFormBuilder,private divV:DivshowAddCommentService,private Search:SearchService,private Dim:HeihtService,private Mod:ModPointService) {
                this.screenWidth = window.innerWidth ;
                this.screenHeight = window.innerHeight;
                this.divS.nextMessage(this.isShown)
                this.divS.getValues().subscribe((value) => this.isShown = value);
                console.log(this.isShown+' aaa')
                this.divSADD.nextMessage(this.isShownAdd)
                this.divSADD.getValues().subscribe((value) => {
                  this.isShownAdd = value
                  if(value){
                    this.buttonToBeClicked.nativeElement.click();
                  }
                });
                this.divV.getValues().subscribe((value) => {
                  if(value){
                    this.buttonToBeClickedComment.nativeElement.click();
                  }
                });
                this.Mod.getValues().subscribe((value) => {
                  if(value){
                    this.buttonToBeClickedMod.nativeElement.click();
                    this.ADRESSMControl.setValue(this.Point.address)
                    this.CITTAMControl.setValue(this.Point.city)
                    this.COUNTRYMControl.setValue(this.Point.naz)
                    this.PHONEMControl.setValue(this.Point.phone)
                    this.WMControl.setValue(this.Point.website)
                    this.FonteMControl.setValue(this.Point.access)
                    this.src=this.Point.photoH
                    this.setService()
                    this.isfile=true
                  }
                });
                this.Search.getValues().subscribe((value) => {
                  if(value!=null){
                    this.map.panTo(new L.LatLng(value.lat, value.lon))
                  }
                });
                this.reactiveFormInfoCard = this.formBuilder.group({
                  NOME: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                  ]],
                  COUNTRY: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                  ]],
                  CITTA: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                  ]],
                  PHONE: ['',
                  [
                    Validators.pattern("^[0-9\-]*$")
                  ]],
                  Website: [''],
                  ADRESS: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(120)
                  ]],
                  Commento:[''],
                  Accessibilits:['gr',[
                    Validators.required]]
                });
                this.reactiveFormInfoMCard = this.formBuilder.group({
                  NOME: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                  ]],
                  COUNTRY: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                  ]],
                  CITTA: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(50)
                  ]],
                  PHONE: ['',
                  [
                    Validators.pattern("^[0-9\-]*$")
                  ]],
                  Website: [''],
                  ADRESS: ['',
                  [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(120)
                  ]],
                  Accessibilits:['gr',[
                    Validators.required]]
                });
    this.reactiveFormAddC = this.formBuilder.group({
      Commento:['',[
        Validators.required]]
    });
    this.AddCommentoControl = this.reactiveFormAddC.get('Commento');
    this.CommentoControl = this.reactiveFormInfoCard.get('Commento');
    this.RankkkControl = this.reactiveFormInfoCard.get('Ranking');
    this.COUNTRYControl = this.reactiveFormInfoCard.get('COUNTRY');
    this.CITTAControl = this.reactiveFormInfoCard.get('CITTA');
    this.FonteControl = this.reactiveFormInfoCard.get('Accessibilits');
    this.NomeControl = this.reactiveFormInfoCard.get('NOME');
    this.ADRESSControl = this.reactiveFormInfoCard.get('ADRESS');
    this.PHONEControl = this.reactiveFormInfoCard.get('PHONE');
    this.WControl = this.reactiveFormInfoCard.get('Website');

    this.COUNTRYMControl = this.reactiveFormInfoMCard.get('COUNTRY');
    this.CITTAMControl = this.reactiveFormInfoMCard.get('CITTA');
    this.FonteMControl = this.reactiveFormInfoMCard.get('Accessibilits');
    this.ADRESSMControl = this.reactiveFormInfoMCard.get('ADRESS');
    this.PHONEMControl = this.reactiveFormInfoMCard.get('PHONE');
    this.WMControl = this.reactiveFormInfoMCard.get('Website');
    this.users.getValues().subscribe((value) => {
      this.user = value;
      if(this.user!=null){
        this.LoginOK=true;
        this.addPointToMap()
        ////console.log('q1p,')
      }
    });
    this.ListaPunti.getValues().subscribe((value) => {
      if(this.Punti==null){
        this.Punti=value
      }
      else{
        ////console.log(this.Punti.length+' l7l '+value.length)
        if(value!=null){

          for (const v in this.Punti) {
            const index = value.findIndex(item => item.id === this.Punti[v].id);
            if(index>=0){
              value.splice(index,1)
            // ////console.log(index+' LP'+value.length)
              value.push(this.Punti[v])
              //////console.log(index+' LP'+value.length)
            }
          }
          ////console.log('q2 '+this.Punti.length)
          this.Punti=value
          this.addPointToMap()
        }
      }
    });
    this.ListaPuntiDB.getValues().subscribe((value) => {
      if(this.Punti==null){
        this.Punti=value
      }
      else{
        console.log(this.Punti.length+' dP'+value.length)
        for (const v in value) {
        const index = value.findIndex(item => item.id === this.Punti[v].id);
        if(index>=0){
          value.splice(index,1)
          ////console.log(index+' dP'+value.length)
          value.push(this.Punti[v])
        }}
        ////console.log('q2 '+this.Punti.length)
        this.Punti=value
          this.addPointToMap()
      }
    });
    this.PUN.getValues().subscribe((value) => {
      this.Point = value;
      if(this.Point!=null){
        this.icon=this.Point.iconax2
       this.NomeControl.setValue(this.Point.nome)
       if(this.Point.modPhoto){
        const index = this.Punti.findIndex(item => item.id === this.Point.id);
        if(index>=0){
          this.Point.modPhoto=false
          this.Punti.splice(index,1)
          //
          this.Punti.push(this.Point)
          this.addPointToMap()
        }
       }
       ////console.log('QA'+this.Point.street)
       if(this.isShownAdd){
       if( this.Point.street==="" ||this.Point.address ==="" ){
        DBService.getPointAddress(this.Point.lat,this.Point.lon).subscribe(data=>{
          this.Point.address=data['address']['road']
          this.Point.city=data['address']['city']
          this.Point.naz=data['address']['country']
          this.ADRESSControl.setValue(this.Point.address )
          this.CITTAControl.setValue(this.Point.city)
          this.COUNTRYControl.setValue(this.Point.naz)
        })
       }else{
        this.CITTAControl.setValue(this.Point.city)
        this.COUNTRYControl.setValue(this.Point.naz)
          this.ADRESSControl.setValue(this.Point.street+' '+this.Point.housenumber)
       }
      }
     }
     });
     ////console.log( this.Point)

 }
 src:any
 isfile=false

 imageChangedEvent: any = '';
 croppedImage: any = '';

 fileChangeEvent(event: any): void {
     this.imageChangedEvent = event;
 }
 imageCropped(event: ImageCroppedEvent) {
     compressImage(event.base64, 450, 253 ).then(compressed => {
  this.croppedImage = compressed;
  console.log(this.croppedImage)
 this.isfile=true
})
 }
 imageLoaded() {
     // show cropper
 }
 cropperReady() {
     // cropper ready
 }
 loadImageFailed() {
     // show message
 }
    comment:Commento
    AddComment(){
      this.comment= {
        ranking:this.RankAddC,
        point_id:this.Point.id,
        descrizione:this.AddCommentoControl.value,
        id: 0,
        created_at:'',
        updated_at:'',
        user:null
      };
    this.DBService.SaveComment(this.comment).subscribe(data => {
      if(data['status']==200){
        this.Point.Commenti=data['comment']
        this.Point.ranking=data['rank']
        this.PUN.nextMessage(this.Point)
        this.buttonToBeClickedCommentClose.nativeElement.click();
        this.RankAddC=0
        this.reactiveFormAddC.reset()
      }
      })
    }
    modPoint(){
      this.Point.address=this.ADRESSMControl.value;
      this.Point.phone=this.PHONEMControl.value;
      this.Point.website=this.WMControl.value;
      this.Point.service=this.accessibilityM.toString();
      this.Point.access = this.FonteMControl.value;
        //console.log(this.Point)
      this.DBService.UpdatePoint(this.Point,this.croppedImage).subscribe(
        (res)=>{
          if(res['status']==200){
            let P=res['luogo'][0]
            var punto=new Points()
            punto.setNode(P)
            const index = this.Punti.findIndex(item => item.id === P.id);
            if(index>=0){
              this.Punti.splice(index,1)
              this.Punti.push(punto)
              this.isfile=false
              this.addPointToMap()
              this.src=''
              this.croppedImage= ''
              this.reactiveFormInfoMCard.reset()
              this.RankAdd=0
              this.RampaM='assets/rampa_off.png'
              this.MMScaleM='assets/montascale_off.png'
              this.AscensoreM='assets/ascensore_off.png'
              this.WCM='assets/wc_off.png'
              this.ParkingM='assets/parcheggio_off.png'
              this.buttonToBeClickedMP.nativeElement.click();
            }
          }

        }
      )
    }
  AddPoint(){
    this.Point.address=this.ADRESSControl.value;
    this.Point.phone=this.PHONEControl.value;
    this.Point.website=this.WControl.value;
    this.Point.service=this.accessibility.toString();
    this.Point.ranking=this.RankAdd
   this.Point.commento=this.CommentoControl.value
    this.Point.access = this.FonteControl.value;////console.log(JSON.stringify(this.Point));
    this.DBService.SavePoint(this.Point,this.croppedImage).subscribe(res => {

        if(res['status']==200){
          let P=res['luogo'][0]
          var punto=new Points()
          punto.setNode(P)
          const index = this.Punti.findIndex(item => item.id === P.id);
          console.log(index+'punto'+P.id)
          if(index>=0){
            this.Punti.splice(index,1)
            this.Punti.push(punto)
            this.isfile=false
            this.addPointToMap()
            this.src=''
            this.croppedImage= ''
            this.reactiveFormInfoCard.reset()
            this.RankAdd=0
            this.Rampa='assets/rampa_off.png'
            this.MMScale='assets/montascale_off.png'
            this.Ascensore='assets/ascensore_off.png'
            this.WC='assets/wc_off.png'
            this.Parking='assets/parcheggio_off.png'
            this.RankAdd1="assets/gr.png";
            this.RankAdd2="assets/gr.png";
            this.RankAdd3="assets/gr.png";
            this.RankAdd4="assets/gr.png";
            this.RankAdd5="assets/gr.png";
            this.buttonToBeClickedAddP.nativeElement.click();
            this.PUN.nextMessage(punto)

          }

        }
      })
  }
 onCheckboxChange(e:any) {
  const website: UntypedFormArray = this.reactiveFormInfoCard.get('acess') as UntypedFormArray;

  if (e.target.checked) {
    website.push(new UntypedFormControl(e.target.value));
  } else {
     const index = website.controls.findIndex(x => x.value === e.target.value);
     website.removeAt(index);
  }
}
Closa(){

  this.divS.nextMessage(false)
}
Closadd(){

  this.divSADD.nextMessage(false)
}
  ngAfterViewInit(): void {
    this.divS.nextMessage(this.isShown)
     this.divS.getValues().subscribe((value) => this.isShown = value);
     this.PUN.getValues().subscribe((value) => {
       this.Point = value;
       if(this.Point!=null){
         this.nome=this.Point.nome
        this.NomeControl.setValue(this.Point.nome)
        if( this.Point.street==="" ){
          ////console.log( this.Point.street+'a')
        }else{
          //this.ADRESSControl.setValue(this.Point.street+' cc  '+this.Point.housenumber)
        }
      }
      });
      this.screenWidth = window.innerWidth ;
      this.screenHeight = window.innerHeight-42;
     this.Dim.nextMessage(new Dimension(this.screenHeight,this.screenWidth))
      ////console.log( this.Point)
    this.initMap();
  }
  private addPointToMap(): void{
          this.layerGroup.clearLayers();
          var divshow=this.divS;
          var login = this.LoginOK
          var divshowAdd=this.divSADD;
          var PUNTO=this.PUN
          console.log( this.Punti)
          var m=this.map
          for (const c of this.Punti) {
            var iconRetinaUrl = c.iconax2;
            var iconUrl = c.icona ;
            var shadowUrl = 'assets/marker-shadow.png';
            var iconDefault = L.icon({
              iconRetinaUrl,
              iconUrl,
              shadowUrl,
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
              tooltipAnchor: [16, -28],
              shadowSize: [41, 41]
            });
            L.Marker.prototype.options.icon = iconDefault;
            if(c.lat!=undefined && c.lon!=undefined){
                var marker = L.marker([c.lat, c.lon]).on('click', function(e ) {
                  m.panTo(new L.LatLng(c.lat, c.lon));
                  PUNTO.nextMessage(c);////console.log(c)
                  if(c.access === "gr" && login) {
                    divshow.nextMessage(false)
                    divshowAdd.nextMessage(true)
                  }
                  else
                  if(c.access === "gr" && !login) {
                    divshow.nextMessage(false)
                    divshowAdd.nextMessage(false)
                  }
                  else
                  if(c.access !== "gr" && login){
                    divshow.nextMessage(true)
                    divshowAdd.nextMessage(false)
                  }
                  else
                  if(c.access !== "gr"){
                    divshow.nextMessage(true)
                    divshowAdd.nextMessage(false)
                  }
                });
                marker.on('mouseover', function(e ) {
                  if(c.access === "gr" && login) {
                  var iconRetinaUrl = "assets/addpoint.png";
                  var iconUrl =  "assets/addpoint.png" ;
                  var shadowUrl = 'assets/marker-shadow.png';
                  var iconDefault = L.icon({
                    iconRetinaUrl,
                    iconUrl,
                    shadowUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    tooltipAnchor: [16, -28],
                    shadowSize: [41, 41]
                  });
                  e.target.setIcon(iconDefault);}
                });
                var ttP=this.Punti
                marker.on('mouseout', function(e ) {
                  var iconRetinaUrl = c.iconax2;
                  var iconUrl = c.icona;
                  var shadowUrl = 'assets/marker-shadow.png';
                  var iconDefault = L.icon({
                    iconRetinaUrl,
                    iconUrl,
                    shadowUrl,
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    tooltipAnchor: [16, -28],
                    shadowSize: [41, 41]
                  });
                  e.target.setIcon(iconDefault);
                });
                    this.layerGroup.addLayer(marker).addTo(this.map);
            }
          }

  }
  private initMap(): void {
  this.map = L.map('map', {
    center: [ 44.30462714477678, 8.48447548624994],
    zoom: 17
  });
    var db=this.DBService
    var lista=this.ListaPunti
    var listaDB=this.ListaPuntiDB
    var p=this.Punti
 var m=this.map
  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 29,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });
    this.map.on('moveend', function(e) {
      lista.nextMessage(null)
      listaDB.nextMessage(null)
      ////console.log('click1'+m.getBounds())
      p = null;
      getGR(m.getBounds(),db,lista)
      getPunti(m.getBounds(),db,listaDB)
    });
getGR(this.map.getBounds(),this.DBService,this.ListaPunti);
getPunti(this.map.getBounds(),this.DBService,this.ListaPuntiDB);
  tiles.addTo(this.map);
}

}
function getGR(v:any,DBService:DBServiceService,ListaPunti:PointService){
  DBService.getPuntiGR(v._southWest, v._northEast).subscribe(data => {
     populateArrayGR(data.elements,ListaPunti)
  } );
}
function getPunti(v:any,DBService:DBServiceService,ListaPunti:PointdbService){
  DBService.getPunti(v._southWest, v._northEast).subscribe(data => {
     populateArray (data.luogo,ListaPunti)
  } );
}
function populateArray (elem:Array<any>,ListaPunti:PointdbService){
  var array=Array<Points>()
  for(const p in elem){
    var punto=new Points()
    punto.setNode(elem[p])
    console.log(punto)
    array.push(punto)
  }
console.log('datadq'+array.length)
  ListaPunti.nextMessage(array)
}
function populateArrayGR(elem:Array<any>,ListaPunti:PointService ){
    var array=Array<Points>()
    for(const p in elem){
    var punto=new Points()
      if(elem[p]['type']=='way'){
        let idspiagga=elem[p]['nodes'][0]
        let b=elem.find(item => item['id'] == idspiagga)
        punto.setNodeGR(elem[p] ,b["lat"] ,b["lon"] ,'GR')
      }
      if(elem[p]['type']=='node' && elem[p]["tags"]!==undefined){
      punto.setNodeGR(elem[p] ,elem[p]["lat"] ,elem[p]["lon"] ,'GR')
      }
      array.push(punto)
    }
    ListaPunti.nextMessage(array)
    ////console.log('data'+array.length)
  }
