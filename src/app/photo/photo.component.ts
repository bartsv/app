import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, Validators } from '@angular/forms';
import { DBServiceService } from '../classi/dbservice.service';
import { HeihtService } from '../classi/heiht.service';
import { Points } from '../classi/points';
import { PuntoService } from '../classi/punto.service';
import { UserService } from '../classi/user.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
class ImageSnippet {
  constructor(public src: string, public file: File) {}
}

@Component({
  selector: 'app-photo',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  Point!: Points;
  AddPhoto=false
  image:Array<string>
  LoginOK=false
  fileName: string;
  Upload(){
    this.DB.AddPhoto(this.Point.id,this.croppedImage).subscribe((data)=>{
      if(data['status']==200){
        this.Point=data['luogo'][0]
        var punto=new Points()
        punto.setNode(this.Point)
        punto.modPhoto=true
        this.size=0
        this.reactiveFormAddPhoto.reset()
        this.croppedImage=''
        this.isfile=false
        this.PUN.nextMessage(punto)
      }
    })
  }
  showDiv(){
    if(!this.AddPhoto){
      this.AddPhoto=true
    }
    else{
      this.AddPhoto=false
    }
  }
  isfileOK=false
  size=0
  src:any
  isfile=false
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

      reader.onload = (_event) => {
        this.src = reader.result;
        this.selectedFile = new ImageSnippet(event.target.result, file);
      }
    }
   else{
    this.isfileOK=true
    this.isfile=false
   }


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

     reactiveFormAddPhoto: any;
     screenHeight: number;
     screenWidth: number;
     PhotoControl: any;
  constructor(private PUN : PuntoService,private user:UserService,private DB:DBServiceService, private formBuilder: UntypedFormBuilder,private Dim:HeihtService) {

    this.Dim.getValues().subscribe((value) => {
      if(value!=null){
        this.screenHeight=value.height-100;
        console.log(this.screenHeight)
        this.screenWidth=value.width
      }
    });
    this.user.getValues().subscribe((value) => {
      if(value!=null){
        this.LoginOK=true;
      }
    });
    this.PUN.getValues().subscribe((value) => {
      this.Point = value
      this.image=this.Point.photo.split(';')
    })
    this.reactiveFormAddPhoto = this.formBuilder.group({
      FILES:['',[
        Validators.required
        ]]
    })
    this.PhotoControl = this.reactiveFormAddPhoto.get('FILES');
  }

  ngOnInit(): void {
  }

}
