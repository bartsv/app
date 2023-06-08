import { AfterViewInit } from '@angular/core';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';
import { ConfirmedValidator } from '../classi/CustomValidators';
import { DBServiceService } from '../classi/dbservice.service';
import { Search } from '../classi/search';
import { SearchService } from '../classi/search.service';
import { Users } from '../classi/User';
import { UserService } from '../classi/user.service';
import { ImageCroppedEvent, LoadedImage } from 'ngx-image-cropper';

class ImageSnippet {
  constructor(public src: string, public file: File) {}
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit,AfterViewInit {
  modAvatar(){
    this.DB.changeAvatarLOGIN(this.croppedImage).subscribe(data => {
      if(data['status']==200){
      this.photoU =data['photo']
      localStorage.setItem('photo', data['photo'])
      this.croppedImage=''
      this.isfile=true
      this.isfileOK=true
      this.imageChangedEvent=null
      this.closeModalAvatar.nativeElement.click()
    }
    })
  }
  imageChangedEvent: any = '';
  croppedImage: any = '';

  fileChangeEvent(event: any): void {
      this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
      this.croppedImage = event.base64;
       console.log(this.croppedImage)
    this.isfile=true
    this.isfileOK=true
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

  auth2: any;

  @ViewChild('loginRef', {static: true }) loginElement!: ElementRef;
  reactiveFormLogin: UntypedFormGroup;
  reactiveFormNP: UntypedFormGroup;
  reactiveFormRegister: UntypedFormGroup;
  submitted = false;
  NomeControl: any; CognomeControl: any; NickControl: any; MailControl: any; PSWControl: any;CPSWControl: any;AControl: any;
  @ViewChild("closeModalR")
  closeModalR!: ElementRef;
  @ViewChild('closeModalL')closeModalL!: ElementRef;
  @ViewChild('closeModalA')closeModalA!: ElementRef;
  @ViewChild('closeModalAvatar')closeModalAvatar!: ElementRef;
  @ViewChild('closeModalMP')closeModalMP!: ElementRef;
  @ViewChild('reg')
  reg!: ElementRef;
  MailLControl: any; PSWLControl: any;
  errore='';
LoginOK=false;nomeU!: string;
  photoU: any;
  PhotoControl: any;
  imageError: string;
  hide = true;
  cardImageBase64: any;
  isImageSaved: boolean;
  MailNPControl: any;
  PSWNPControl: any;
  CPSWNPControl: any;
  NomeMPControl: any;
  CognomeMPControl: any;
  NickMPControl: any;
LogOut(){
  localStorage.removeItem('token')
  this.eser.nextMessage(null)

}
modPSW(){
  console.log(this.reactiveFormNP.value)
  this.DB.resetPasswordLOGIN(this.PSWNPControl.valu,this.CPSWNPControl.value).subscribe(res=>{
    console.log(res)
    this.closeModalMP.nativeElement.click()
  })
}
  constructor(private formBuilder: UntypedFormBuilder,private DB: DBServiceService,private eser:UserService,private SearchC:SearchService) {
    this.eser.getValues().subscribe( (value)=>{
      if(value!=null){
        this.LoginOK=true

        const decoded = jwtDecode<JwtPayload>(value);
        this.NomeMPControl.setValue( decoded['nome'])
        this.CognomeMPControl.setValue( decoded['cognome'])
        this.NickMPControl.setValue( decoded['nick'])
        this.MailNPControl.setValue( decoded['email'])
        this.CognomeMPControl.disable()
        this.MailNPControl.disable()
        this.NickMPControl.disable()
        this.NomeMPControl.disable()
      }
      else{
        this.LoginOK=false
      }
    })
    this.googleAuthSDK();
    this.reactiveFormRegister = this.formBuilder.group({
        acceptTerms: [false, Validators.requiredTrue],
        Nome:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern("[a-zA-Z]*")]],
        Cognome:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern("[a-zA-Z]*")]],
        Nickname:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern("[a-zA-Z0-9]*")]],
        Mail:['',[Validators.required,Validators.email]],
        password :['',[Validators.required,Validators.minLength(8)]],
        confirm_password:['',[Validators.required,Validators.minLength(8)]]}, {
          validator: ConfirmedValidator('password', 'confirm_password')
        })
        this.NomeControl = this.reactiveFormRegister.get('Nome');
        this.CognomeControl = this.reactiveFormRegister.get('Cognome');
        this.NickControl = this.reactiveFormRegister.get('Nickname');
        this.MailControl = this.reactiveFormRegister.get('Mail');
        this.PSWControl = this.reactiveFormRegister.get('password');
        this.CPSWControl = this.reactiveFormRegister.get('confirm_password');
        this.AControl = this.reactiveFormRegister.get('acceptTerms');
        this.reactiveFormLogin = this.formBuilder.group({
          MailL:['',[Validators.required]],
          passwordL :['',[Validators.required,Validators.minLength(8)]],
        })
        this.MailLControl = this.reactiveFormLogin.get('MailL');
        this.PSWLControl = this.reactiveFormLogin.get('passwordL');
        this.reactiveFormNP = this.formBuilder.group({
          Nome:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern("[a-zA-Z]*")]],
          Cognome:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern("[a-zA-Z]*")]],
          Nickname:['',[Validators.required,Validators.maxLength(50),Validators.minLength(3),Validators.pattern("[a-zA-Z0-9]*")]],
          Mail:['',[Validators.required,Validators.email]],
        Rpassword :['',[Validators.required,Validators.minLength(8)]],
        Rconfirm_password:['',[Validators.required,Validators.minLength(8)]]}, {
          validator: ConfirmedValidator('Rpassword', 'Rconfirm_password')
        })
        this.NomeMPControl = this.reactiveFormNP.get('Nome');
        this.CognomeMPControl = this.reactiveFormNP.get('Cognome');
        this.NickMPControl = this.reactiveFormNP.get('Nickname');
        this.MailNPControl = this.reactiveFormNP.get('Mail');
        this.PSWNPControl = this.reactiveFormNP.get('Rpassword');
        this.CPSWNPControl = this.reactiveFormNP.get('Rconfirm_password');
   }

   errR=false
   Registrati(){
     let user:Users={
       nome: this.NomeControl.value,
       id: 0,
       nick: this.NickControl.value,
       photo: '',
       email: this.MailControl.value,
       psw: this.PSWControl.value,
       cpsw: this.CPSWControl.value,
       cognome: this.CognomeControl.value
     }
     this.DB.Register(user,this.croppedImage).subscribe(data => {
       console.log(data )
       if(data['status']==200){
        this.cardImageBase64=''
        this.croppedImage =''
         this.errore=data['message']
         this.selectedFile=null
         this.closeModalR.nativeElement.click()
         this.reactiveFormRegister.reset()
       }else{
         this.errR=true
        this.errore=data['message']
       }
   } );
   }
   src:any
   src1='assets/user.png'
   size=0
   isfile=false
   isfileOK=false
   fileName=''
   selectedFile!: ImageSnippet;
   onFileSelected(event:any) {

    const file: File = event.target.files[0];
    this.size=file.size

     if(this.size<=2048000000 && (file.type.includes('png') || file.type.includes('jpg') || file.type.includes('jpeg'))){
    const reader = new FileReader();
       this.fileName= file.name ;
       this.isfile=true
       this.isfileOK=false
       reader.readAsDataURL(event.target.files[0]);

       reader.onload = (e: any) => {
         this.src = reader.result;
         this.selectedFile = new ImageSnippet(e.target.result, file);

         const image = new Image();
         image.src = e.target.result;
         image.onload = (rs:any) => {
             const img_height = rs.currentTarget['height'];
             const img_width = rs.currentTarget['width'];

             console.log(img_height, img_width);

             if (img_height > 200 && img_width > 200) {
                 this.imageError =
                     'Maximum dimentions allowed ' +
                     200 +
                     '*' +
                     200 +
                     'px';
                     this.isfile=false
                     this.isfileOK=false
                 return false;
             } else {
                 const imgBase64Path = e.target.result;
                 this.cardImageBase64 = imgBase64Path;
                 this.isImageSaved = true;

       this.isfileOK=true
       return true
                 // this.previewImagePath = imgBase64Path;
             }
         };
       }
     }
    else{
     this.isfileOK=true
     this.isfile=false
    }


     }
   Login(){
    let user:Users={
      nome: '' ,
      id: 0,
      nick:  '',
      photo: '',
      email: this.MailLControl.value,
      psw: this.PSWLControl.value,
      cpsw: '',
      cognome: ''
    }
    this.DB.Login(user).subscribe(data => {
      console.log(data)
      if(data['status']==200){
        localStorage.setItem('token', data['access_token'])
        this.eser.nextMessage(data['access_token'])
        const decoded = jwtDecode<JwtPayload>(data['access_token']);
        this.nomeU =decoded['nick']
        this.photoU =data['photo']
        localStorage.setItem('photo', data['photo'])
        this.LoginOK=true
        this.reactiveFormLogin.reset()
        this.closeModalL.nativeElement.click()
      }else[
       this.errore=data['err']
      ]
  } );
   }

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
   onKeyDownEvent(event: any){
    console.log(event.target.value);
    this.DB.getPointCoordinate(event.target.value).subscribe(data=>{
      this.populateArray(JSON.parse(JSON.stringify(data)))
    })
    }
    onEnter(evt: any,ids:number){
      if (evt.source.selected) {
       let v=this.states.find(item => item.id==ids)
       console.log(v)
       this.SearchC.nextMessage(v)
      }
    }
    populateArray (elem:Array<any>){
      var array=Array<Search>()
      for(const p in elem){
        var e=elem[p]
        var punto=new Search(e['place_id'],e['display_name'],e['icon'],e['lat'],e['lon'])
        array.push(punto)
      }
      this.states=array
    }
  states:Array<Search>
  /*------------------------------------------
  --------------------------------------------
  About
  --------------------------------------------
  --------------------------------------------*/

    // convenience getter for easy access to form fields
    get f() { return this.reactiveFormRegister.controls; }
      ngOnInit(): void {
        var t=localStorage.getItem('token')
        if(t!=null){
          this.eser.nextMessage(t)
          const decoded = jwtDecode<JwtPayload>(t);
          this.nomeU =decoded['nick']
          this.photoU =localStorage.getItem('photo')
          this.LoginOK=true
        }
    this.googleAuthSDK()
  }
  ngAfterViewInit() {
    this.reg.nativeElement.focus();
  }
  /**
   * Write code on Method
   *
   * @return response()
   */
  callLoginButton() {

    this.auth2.attachClickHandler(this.loginElement.nativeElement, {},
      (googleAuthUser:any) => {

        let profile = googleAuthUser.getBasicProfile();
        var name:string=profile.getName();
        let t=name.split(' ')
       // console.log('Image URL: ' + profile.getImageUrl());
        let mail=profile.getEmail() ;
        let user:Users={
          nome: t[0] ,
          id: 0,
          nick:  name,
          email: mail,
          psw: 'Default10',
          cpsw: 'Default10',
          cognome: t[1],
          photo: profile.getImageUrl()
        }
        this.DB.LoginG(user).subscribe(data => {
          if(data['status']==200){
            this.eser.nextMessage(data['access_token'])
            localStorage.setItem('token', data['access_token'])
            const decoded = jwtDecode<JwtPayload>(data['access_token']);
            this.nomeU =decoded['nome']
            this.photoU =decoded['photo']
            this.LoginOK=true
            this.reactiveFormLogin.reset()
            this.closeModalL.nativeElement.click()
          }else[
           this.errore=data['err']
          ]
      } );

      }, (error:any) => {
      });

  }

  /**
   * Write code on Method
   *
   * @return response()
   */
  googleAuthSDK() {

    (<any>window)['googleSDKLoaded'] = () => {
      (<any>window)['gapi'].load('auth2', () => {
        this.auth2 = (<any>window)['gapi'].auth2.init({
          clientId: '953649705981-vslb47sap2dp13nsvouflamlipj2qa3a.apps.googleusercontent.com',
          plugin_name: "chat"
        });
        this.callLoginButton();
      });
    }

    (function(d, s, id){
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {return;}
      js = d.createElement('script');
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    }(document, 'script', 'google-jssdk'));

  }

}
