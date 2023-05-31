import { Component, OnInit } from '@angular/core';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { Commento } from '../classi/Commenti';
import { DBServiceService } from '../classi/dbservice.service';
import { DivshowAddCommentService } from '../classi/divshow-add-comment.service';
import { HeihtService } from '../classi/heiht.service';
import { Points } from '../classi/points';
import { PuntoService } from '../classi/punto.service';
import { UserService } from '../classi/user.service';

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
  idUser:number
  toTimestamp(strDate){ var datum = Date.parse(strDate); return datum;}
  addComment(){
    this.divC.nextMessage(true)
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
  constructor(private PUN : PuntoService, private divC:DivshowAddCommentService,private user:UserService, private db:DBServiceService,private Dim:HeihtService) {this.Dim.getValues().subscribe((value) => {
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
  }
  RankAdd1="assets/gr.png";
  RankAdd2="assets/gr.png";
  RankAdd3="assets/gr.png";
  RankAdd4="assets/gr.png";
  RankAdd5="assets/gr.png";
   ngOnInit(): void {
  }

}
