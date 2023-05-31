import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmedValidator } from 'src/app/classi/CustomValidators';
import { DBServiceService } from 'src/app/classi/dbservice.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  mail: string;
OnClick() {
  this.db.resetPassword(this.MailLControl.value,this.PSWControl.valu,this.CPSWControl.value,this.id).subscribe(res=>{
    console.log(res)
  })
}
  id: string;
  resetForM: any;
  MailLControl: any;
PSWControl: any;
CPSWControl: any;
isShow=false;
message: any;

  constructor(private route: ActivatedRoute,private fb: FormBuilder,private db:DBServiceService) {
    this.resetForM = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password :['',[Validators.required,Validators.minLength(8)]],
      confirm_password:['',[Validators.required,Validators.minLength(8)]]}, {
        validator: ConfirmedValidator('password', 'confirm_password')
      })
      this.MailLControl=this.resetForM.get('email')
      this.PSWControl=this.resetForM.get('password')
      this.CPSWControl=this.resetForM.get('confirm_password')
   }

  ngOnInit(): void {
    this.id = this.route.snapshot.queryParamMap.get('id')
    this.db.checkCode(this.id).subscribe(res=> {
      console.log(res)
      if(res['status'] == 200){
        this.MailLControl.setValue( res['mail'])
        this.MailLControl.disable()
        this.isShow=false
      }
      else{
        this.MailLControl.disable()
        this.CPSWControl.disable()
        this.PSWControl.disable()
        this.message=res['message']
        this.isShow=true
      }
    })
  }

}
