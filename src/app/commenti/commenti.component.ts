import { Component, OnInit } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Commento } from '../classi/Commenti';
import { DBServiceService } from '../classi/dbservice.service';
import { DivshowAddCommentService } from '../classi/divshow-add-comment.service';
import { HeihtService } from '../classi/heiht.service';
import { Points } from '../classi/points';
import { PuntoService } from '../classi/punto.service';
import { UserService } from '../classi/user.service';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-commenti',
  templateUrl: './commenti.component.html',
  styleUrls: ['./commenti.component.css']
})
export class CommentiComponent implements OnInit {
  Comm:Array<Commento>
  screenHeight: number;
  screenWidth: number;
  d:any
  access:string
  Point!: Points;
  LoginOK=false
  CommentoOK=false
  idUser:number
  reactiveFormAddC: any;
  AddCommentoControl: any;
  RankAddC: number;
  toTimestamp(strDate){ var datum = Date.parse(strDate); return datum;}
  addComment(){
    this.CommentoOK=true
  }
  closeComment(){
    this.CommentoOK=false
  }
  deleteComment(idC){
    this.db.DeletCommento(idC,this.Point.id).subscribe(data => {
      if(data['status']==200){
        this.Point.Commenti=data['comment']
        this.Point.ranking=data['rank']
        this.PUN.nextMessage(this.Point);
      }
    })
  }
  constructor(private PUN : PuntoService, private divC:DivshowAddCommentService,private user:UserService,
     private db:DBServiceService,private Dim:HeihtService,private formBuilder: FormBuilder) {
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
        const decoded = jwtDecode<JwtPayload>(value);
        this.idUser =decoded['id']
      }
    });
    this.PUN.getValues().subscribe((value) => {
      this.Point = value
      this.d=Date.now()
      this.access=this.Point.access
      this.access.includes('g')
      this.Comm=this.Point.Commenti
    })
    this.reactiveFormAddC = this.formBuilder.group({
      Commento:['',[Validators.required, Validators.minLength(10)]]
    });
    this.AddCommentoControl = this.reactiveFormAddC.get('Commento');
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
  this.db.SaveComment(this.comment).subscribe(data => {
    if(data['status']==200){
      this.Point.Commenti=data['comment']
      this.Point.ranking=data['rank']
      this.PUN.nextMessage(this.Point)
      this.RankAddC=0
      this.CommentoOK=false
      this.reactiveFormAddC.reset()
    }
    })
  }
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




  RankAdd1="assets/gr.png";
  RankAdd2="assets/gr.png";
  RankAdd3="assets/gr.png";
  RankAdd4="assets/gr.png";
  RankAdd5="assets/gr.png";
  RankAdd1C="assets/gr.png";
  RankAdd2C="assets/gr.png";
  RankAdd3C="assets/gr.png";
  RankAdd4C="assets/gr.png";
  RankAdd5C="assets/gr.png";
   ngOnInit(): void {
  }

}
