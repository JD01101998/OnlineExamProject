import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionComponent } from '../question/question.component';
import {QuestionService} from '../Services/QuestionService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ConForm:FormGroup;
  ConForm2: FormGroup;
  email:string;
isSent: boolean = false;
isPress:boolean = false;
login:any={};
isInvalid:boolean=false;


isloginButton:boolean=false;


constructor(private http:HttpClient, private router: Router, private QuestionService : QuestionService) { 

    this.ConForm = new FormGroup({
      email:new FormControl(null,[Validators.required]),
    });
    this.ConForm2 = new FormGroup({
      loginemail:new FormControl(null,[Validators.required]),
      loginpass:new FormControl(null,[Validators.required]),
    });
  }

  report: any={};
  ngOnInit(): void {
 
    if(sessionStorage.getItem("examstarted") == "true"){
      
      
    var sid=sessionStorage.getItem("currentUser");;
    var eid=sessionStorage.getItem("ExamID");
            this.report.StudentID = sid;
            this.report.ExamID = eid;
            this.report.Level1_Score = sessionStorage.getItem("Level1Score");
            this.report.Level2_Score = sessionStorage.getItem("Level2Score");
            this.report.Level3_Score = sessionStorage.getItem("Level3Score");
            this.report.Date = new Date();

            console.log("report here "+this.report);
            
            
    var res = this.http.post("https://localhost:44399/postreport",JSON.stringify(this.report), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res =>{

    console.log("posted");

    });
    
      sessionStorage.clear();
    }

  }

  get loginemail(){
    return this.ConForm2.get("loginemail");
  }
  
  get loginpass(){
    return this.ConForm2.get("loginpass");
  }


  SubmitLogin(){
    this.isloginButton= true;
    var logemail = this.ConForm2.value.loginemail;
    var logpass = this.ConForm2.value.loginpass;

    this.login.email = logemail;
    this.login.password = logpass;

    console.log(this.login);
    //post route for login check here
    
    if(logemail == "admin@gmail.com" && logpass == "admin@12345"){    
    sessionStorage.setItem("email","admin@gmail.com");
    sessionStorage.setItem("Id","a1");
    
    this.router.navigate(["adminhome"]);
    
    }

    else{
    var res = this.http.post("https://localhost:44399/student/login",JSON.stringify(this.login), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res => {console.log("here login "+res.toString());

    if(res.toString() == "NoLogin"){

      this.isInvalid = true;
      console.log(this.isInvalid);
      this.isloginButton= false;
      //alert("No Such User Found");
      

    }
    else if(res.toString() == "Error"){
      alert("An Error occured");
    }
    else{
      sessionStorage.setItem("Id",res["StudentID"]);
      sessionStorage.setItem("email",logemail);
    
    console.log(res["StudentID"]);
    this.router.navigate(['/dashboard']);




    }
  })
    .catch(err=>{
      alert(err);
    });
    }

    console.log(res);
    //send user id alaong with response from api
    //if success redirect to exam page else home page again
    //will have to use session storage to store email id and student id
  }

  SubmitEmail(){
    this.isPress = true;
    this.email = this.ConForm.value.email;
    console.log(this.email);
    var result = this.http.get("https://localhost:44399/getemail?email="+this.email).subscribe(res=>{
      if(res.toString() == "Error"){
        alert("Problem in sending Email")
      }
      else{
      console.log(result);
      this.isPress = false;
      this.isSent = true;
      }
    });
  }

  getEmailf(e:string){
    console.log("e and"+e);
    return this.http.get("https://localhost:44399/getemail?email='surveaniket461@gmail.com'");
  }

}
