import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(private http:HttpClient) {

    this.ConForm = new FormGroup({
      email: new FormControl(null,[Validators.required]),
      passcode: new FormControl(null,[Validators.required]),
      password1: new FormControl(null,[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      password2: new FormControl(null,[Validators.required]),

    }, {validators: this.checkPasswords});

   }

  ngOnInit(): void {
  }


  isSuccess:boolean= false;
  isPress:boolean = false;

  get password2(){
    return this.ConForm.get("password2");
  }

  get password1(){
    return this.ConForm.get("password1");
  }
  
  get email(){
    return this.ConForm.get("email");
  }

  get passcode(){
    return this.ConForm.get("passcode");
  }

  ConForm:FormGroup;

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password1').value;
  let confirmPass = group.get('password2').value;

  return pass === confirmPass ? null : { notSame: true }
}

fp:any={}
SubmitPass(){
  this.isPress = true;
this.fp.email = this.ConForm.value.email;
this.fp.passcode = this.ConForm.value.passcode;
this.fp.newpassword = this.ConForm.value.password1;


var res = this.http.post("https://localhost:44399/forgot",JSON.stringify(this.fp), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res => {console.log("fp here "+res.toString());

this.isPress = false;
this.isSuccess=true;
    console.log(res);
  })
    .catch();

}

}
