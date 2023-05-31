import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DBServiceService } from 'src/app/classi/dbservice.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  resetForm: FormGroup;

  email: string;
  isShown = false;
  message: string;
  MailLControl:any

  OnClick() {
    this.db.sendResetPasswordLink(this.MailLControl.value).subscribe(res=>{
      this.isShown=true
      this.message=res['message']
    })
  }

  constructor(private fb: FormBuilder,private db:DBServiceService) {
    this.resetForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
    this.MailLControl=this.resetForm.get('email')
  }

  ngOnInit(): void {
  }

}
