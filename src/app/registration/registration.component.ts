import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Student } from '../models/student';
import {HttpClient} from '@angular/common/http';
declare var grecaptcha: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  datetest:any="2014-02-01";
  student:any={};
 isRegister: boolean = false;
 isloginButton:boolean=false;

  constructor(private router: Router,private http:HttpClient) {


    this.ConForm = new FormGroup({
      fullname:new FormControl(null,[Validators.required]),
      email:new FormControl(null,[Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
      phonenumber: new FormControl(null,[Validators.required, Validators.pattern('^([7-9]{1}[0-9]{9})$')]),
      college: new FormControl(null,[Validators.required]),
      dob: new FormControl("1998-11-11",[Validators.required]),
      city: new FormControl(null,[Validators.required]),
      state: new FormControl(null,[Validators.required]),
      qualification: new FormControl(null,[Validators.required]),
      yoc: new FormControl(null,[Validators.required]),
      password1: new FormControl(null,[Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$')]),
      password2: new FormControl(null,[Validators.required]),



     // recaptcha: new FormControl(null, [Validators.required]),
      
    }, {validators: [this.checkPasswords, this.checkAge]},
    
    );
   }


  ngOnInit(): void {
  
  }

  students:Student[];
  ConForm:FormGroup;

  
  get password2(){
    return this.ConForm.get("password2");
  }

  get password1(){
    return this.ConForm.get("password1");
  }
  
  get yoc(){
    return this.ConForm.get("yoc");
  }
  
  
  get qualification(){
    return this.ConForm.get("qualification");
  }
  
  get state(){
    return this.ConForm.get("state");
  }
  
  get city(){
    return this.ConForm.get("city");
  }

  get dob(){
    return this.ConForm.get("dob");
  }

  get college(){
    return this.ConForm.get("college");
  }

  get phonenumber(){
    return this.ConForm.get("phonenumber");
   }

   get fullname(){
     return this.ConForm.get("fullname");
    }

    get email(){
     return this.ConForm.get("email");
    }



  headers = new Headers({ 'Content-Type': 'application/json' });

  resp:string;

  checkPasswords(group: FormGroup) { // here we have the 'passwords' group
  let pass = group.get('password1').value;
  let confirmPass = group.get('password2').value;

  return pass === confirmPass ? null : { notSame: true }
}


checkAge(group:FormGroup){
  let date = group.get('dob').value;
  var dat = new Date();
  var d = date.toString().split('-');

  var g = new Date(dat.getFullYear(), dat.getMonth(), dat.getDay());
  var g2 = new Date(d[0], d[1], d[2]);
  var ans = Math.floor((Date.UTC(dat.getFullYear(), dat.getMonth(), dat.getDate()) - Date.UTC(d[0], d[1], d[2]) ) /(1000 * 60 * 60 * 24));
  var dd = Math.floor(ans/365);
  console.log(dd);

  return (dd > 18) ? null :{notUp: true};
}


  SubmitReg(){


this.isloginButton = true;
    console.log("heree");
    this.student.StudentName = this.ConForm.value.fullname;
    this.student.Email = this.ConForm.value.email;
    this.student.Mobile_num = this.ConForm.value.phonenumber;
    this.student.College = this.ConForm.value.college;
    this.student.DOB = this.ConForm.value.dob;
    this.student.City = this.ConForm.value.city;
    this.student.State = this.ConForm.value.state;
    this.student.Qualification = this.ConForm.value.qualification;
    this.student.Year_of_Completion = this.ConForm.value.yoc;
    this.student.Pwd = this.ConForm.value.password1;
    

    console.log(this.student);

    var res = this.http.post("https://localhost:44399/student/post",JSON.stringify(this.student), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res => {this.resp = res.toString();
    if(res.toString() != "Error"){
    this.isRegister = true;
    }
    else{
      alert("Error in registering");
      
  this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{this.router.navigate(['register'])})
    }

  })
    .catch(err=> alert(err));
    console.log("here "+this.resp);
  }

}
