import { Component, OnInit } from '@angular/core';
import { HeihtService } from '../classi/heiht.service';
import { ModPointService } from '../classi/mod-point.service';
import { Points } from '../classi/points';
import { PuntoService } from '../classi/punto.service';
import { UserService } from '../classi/user.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {
  Rampa='assets/rampa_off.png'
  MMScale='assets/montascale_off.png'
  Ascensore='assets/ascensore_off.png'
  WC='assets/wc_off.png'
  Parking='assets/parcheggio_off.png'
  screenHeight: number;
  screenWidth: number;
  LoginOK=false
  Point!: Points;
  src:string
  modP(){
    this.Mod.nextMessage(true)
  }
  constructor( private PUN : PuntoService,private user:UserService,private Dim:HeihtService,private Mod:ModPointService) {
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
      this.Point = value;
      console.log(this.Point )
      if(this.Point!=null){
        this.src=this.Point.photoH
        this.setService()
        if(this.Point.access==='g'){
          this.setgreenRank(this.Point.ranking)
        }
        if(this.Point.access==='y'){
          this.setyellowRank(this.Point.ranking)
        }
        if(this.Point.access==='r'){
          this.setredRank(this.Point.ranking)
        }
      }
    })
    }
  setService(){
    let service=this.Point.service
    console.log(service)
    if(service.includes('rampa')){
      this.Rampa='assets/rampa_on.png';
    }
    if(service.includes('ascensore')){
      this.Ascensore='assets/ascensore_on.png';
    }
    if(service.includes('wc')){
      this.WC='assets/wc_on.png';
    }
    if(service.includes('parcheggio')){
      this.Parking='assets/parcheggio_on.png';
    }
    if(service.includes('montascale')){
      this.MMScale='assets/montascale_on.png'
    }
  }
  RankAdd1="assets/gr.png";
  RankAdd2="assets/gr.png";
  RankAdd3="assets/gr.png";
  RankAdd4="assets/gr.png";
  RankAdd5="assets/gr.png";
  setgreenRank(v:number){
    if(v==1){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/gr.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>1 && v<2){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g2.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==2){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>2 && v<3){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g2.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==3){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>3 && v<4){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
      this.RankAdd4="assets/g2.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==4){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
      this.RankAdd4="assets/g.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>4 && v<5){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
      this.RankAdd4="assets/g.png";
      this.RankAdd5="assets/g2.png";
    }
    if(v==5){
      this.RankAdd1="assets/g.png";
      this.RankAdd2="assets/g.png";
      this.RankAdd3="assets/g.png";
      this.RankAdd4="assets/g.png";
      this.RankAdd5="assets/g.png";
    }
  }
  setyellowRank(v:number){
    if(v==1){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/gr.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>1 && v<2){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y2.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==2){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>2 && v<3){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y2.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==3){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>3 && v<4){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
      this.RankAdd4="assets/y2.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==4){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
      this.RankAdd4="assets/y.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>4 && v<5){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
      this.RankAdd4="assets/y.png";
      this.RankAdd5="assets/y2.png";
    }
    if(v==5){
      this.RankAdd1="assets/y.png";
      this.RankAdd2="assets/y.png";
      this.RankAdd3="assets/y.png";
      this.RankAdd4="assets/y.png";
      this.RankAdd5="assets/y.png";
    }
  }
  setredRank(v:number){
    if(v==1){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/gr.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>1 && v<2){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r2.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==2){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/gr.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>2 && v<3){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r2.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==3){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
      this.RankAdd4="assets/gr.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>3 && v<4){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
      this.RankAdd4="assets/r2.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v==4){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
      this.RankAdd4="assets/r.png";
      this.RankAdd5="assets/gr.png";
    }
    if(v>4 && v<5){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
      this.RankAdd4="assets/r.png";
      this.RankAdd5="assets/r2.png";
    }
    if(v==5){
      this.RankAdd1="assets/r.png";
      this.RankAdd2="assets/r.png";
      this.RankAdd3="assets/r.png";
      this.RankAdd4="assets/r.png";
      this.RankAdd5="assets/r.png";
    }
  }
  ngOnInit(): void {
  }

}
