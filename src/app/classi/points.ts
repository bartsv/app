import { Commento } from "./Commenti";
import { Users } from "./User";


export class Points {
      id: number;
      valore="";
      tipo="";
      icona:string;
      iconax2:string;
      nome="";
      city:string="";
      naz:string="";
      street:string="";
      phone:string;
      website:string;
      housenumber:string="";
      wheelchair:string;
      service=""
      category=""
      address=""
      access=""
      commento=""
      ranking=0
      lat: number;
      lon: number;
      created_at=""
      updated_at=""
      user:Users
      photoH=""
      photo =""
      modPhoto=false
      Commenti:Array<Commento>
    setNode(val:any){
      this.id=val["id"];
      this.user=val["user"];
      this.Commenti=val["comments"];
      this.lat=val["lat"];
      this.lon=val["lon"];
      this.city=val["citta"];
      this.address=val["indirizzo"];
      this.phone= val["tel"];
      this.nome=val["nome"];
      this.website=val["website"] ;
      this.naz=val["nazione"] ;
      this.category=val["category"] ;
      this.access=val["access"] ;
      this.ranking=val["ranking"] ;
      this.service=val["service"] ;
      this.created_at=val["created_at"] ;
      this.updated_at=val["updated_at"] ;
      this.photoH=val["photoH"] ;
      this.photo=val["photo"] ;
      this.iconax2="assets/"+this.access+"_"+this.category+" copia.png"
      this.icona="assets/"+this.access+"_"+this.category+" copia.png"
    }





      setNodeGR(val:any,lat:number,lon:number,colore:string){
            this.id=val["id"];
            this.lat=lat;
            this.lon=lon;
            this.city==val["tags"]["addr:city"];
            this.street==val["tags"]["addr:street"];
            this.housenumber==val["tags"]["addr:housenumber"];
            this.phone==val["tags"]["phone"];
            this.nome=val["tags"]["name"];
            let am=val["tags"]["amenity"];
            let le=val["tags"]["leisure"];
            let hm=val["tags"]["tourism"];
            let gov=val["tags"]["office"];
            let sh=val["tags"]["shop"];
            if(colore=="GR"){
                  if(am!=null){
                        this.setColoreGR(am)
                  }
                  if(le!=null){
                        this.setColoreGR(le)
                  }
                  if(hm!=null){
                        this.setColoreGR(hm)
                  }
                  if(gov!=null){
                        this.setColoreGR(gov)
                  }
                  if(sh!=null){
                        this.setColoreGR(sh)
                  }
            }
      }
      private setColoreGR(t:string){
            this.tipo=t;this.access ='gr'
            this.icona="assets/gr_";
            this.iconax2="assets/2xgr_";
            switch(t){
                  case "bank":this.icona=this.icona+"banche.png"
                              this.iconax2=this.iconax2+"banche.png"
                              this.category="banca"
                              break;
                  case "bar":this.icona=this.icona+"bar.png"
                              this.iconax2=this.iconax2+"bar.png"
                              this.category="bar"
                              break;
                  case "library":this.icona=this.icona+"biblioteche.png"
                              this.iconax2=this.iconax2+"biblioteche.png"
                              this.category="biblioteche"
                              break;
                  case "sport_center":this.icona=this.icona+"centri_sportivi.png"
                              this.iconax2=this.iconax2+"centri_sportivi.png"
                              this.category="centri_sportivi"
                              break;
                  case "cinema":this.icona=this.icona+"cinema.png"
                              this.iconax2=this.iconax2+"cinema.png"
                              this.category="cinema"
                              break;
                  case "pharmacy":this.icona=this.icona+"farmacie.png"
                              this.iconax2=this.iconax2+"farmacie.png"
                              this.category="farmacie"
                              break;
                  case "hotel":this.icona=this.icona+"hotel.png"
                              this.iconax2=this.iconax2+"hotel.png"
                              this.category="hotel"
                              break;
                  case "museum":this.icona=this.icona+"musei.png"
                              this.iconax2=this.iconax2+"musei.png"
                              this.category="musei"
                              break;
                  case "outdoor":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "seafood":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "pastry":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "books":this.icona=this.icona+"biblioteche.png"
                              this.iconax2=this.iconax2+"biblioteche.png"
                              this.category="biblioteche"
                              break;
                  case "ice_cream":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "deli":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "clothes":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "shoes":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "pasta":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "bakery":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "butcher":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "frozen_food":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "greengrocer":this.icona=this.icona+"negozi.png"
                              this.iconax2=this.iconax2+"negozi.png"
                              this.category="negozi"
                              break;
                  case "park":this.icona=this.icona+"parchi.png"
                              this.iconax2=this.iconax2+"parchi.png"
                              this.category="parchi"
                              break;
                  case "post_office":this.icona=this.icona+"poste.png"
                              this.iconax2=this.iconax2+"poste.png"
                              this.category="poste"
                              break;
                  case "restaurant":this.icona=this.icona+"ristoranti.png"
                              this.iconax2=this.iconax2+"ristoranti.png"
                              this.category="ristoranti"
                              break;
                  case "school":this.icona=this.icona+"scuole.png"
                              this.iconax2=this.iconax2+"scuole.png"
                              this.category="scuole"
                              break;
                  case "university":this.icona=this.icona+"scuole.png"
                              this.iconax2=this.iconax2+"scuole.png"
                              this.category="scuole"
                              break;
                  case "beach_resort":this.icona=this.icona+"stabilimenti_balneari.png"
                              this.iconax2=this.iconax2+"stabilimenti_balneari.png"
                              this.category="stabilimenti_balneari"
                              break;
                  case "government":this.icona=this.icona+"uffici_pubblici.png"
                              this.iconax2=this.iconax2+"uffici_pubblici.png"
                              this.category="uffici_pubblici"
                              break;
                  case "supermarket":this.icona=this.icona+"supermercati.png"
                              this.iconax2=this.iconax2+"supermercati.png"
                              this.category="supermercati"
                              break;

            }
      }
}
