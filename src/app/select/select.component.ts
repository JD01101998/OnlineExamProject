import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from "@angular/forms";
import { FormControl, FormGroup} from '@angular/forms';
import { Subscription, timer } from 'rxjs';
import {HttpClient,HttpParams } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
  companydetails: any=[];
  subjectdetails: any=[];
  company:string;
  subject:any;

  name:string = sessionStorage.getItem("email");

  companyid : any;
  registrationForm:FormGroup;
  eid:any; // To Local Storage(After Submit on this Page if Exam Check is passed)
  sid:any; // From Local Storage(After Login)
  message: any={Message: "J"};
  countDown:Subscription;
  counter = 8;
  tick = 1000;
  constructor(private http:HttpClient, public fb: FormBuilder, private router: Router) {
    this.registrationForm = new FormGroup({
      companyName:new FormControl(null,[Validators.required]),
      subjectName:new FormControl(null,[Validators.required]),
       
    });
   }
  
  changeCompany() {
    
    this.company = this.registrationForm.value.companyName;
    //this.companyid = this.company.slice(0,1)
    var c = this.company.split(",");
    this.companyid=c[0];
    
    this.fetchSubject();
    
  }
  changeSubject() {
    
    this.subject = this.registrationForm.value.subjectName;
    for(let a = 0 ; a < this.subjectdetails.length; a++)
     {
       if(this.subjectdetails[a].ExamName==this.subject)
       {
         this.eid=String(this.subjectdetails[a].ExamID);
         sessionStorage.setItem("examname",this.subject);
         sessionStorage.setItem("ExamID",this.eid);
        
       }
     }
      this.eid=this.subjectdetails.ExamID;
      this.fetchExamCheck();
      
  }
  onSubmit() {
    if (!this.registrationForm.valid) {
      return false;
    }
    else{

      
      console.log("Message Received:"+this.message);
      if(this.message=="T")
      {
        
        
        sessionStorage.setItem("l1app","false");
        sessionStorage.setItem("l2app","false");
        sessionStorage.setItem("l3app","false");
        this.router.navigate(['startexam']);
      }
      else
      {
        
      }
    }
    
    
  }
  
  ngOnInit(): void {
    
    this.fetchCompany();
    
  }
  fetchCompany()
  {
    this.companydetails = this.http.get("https://localhost:44399/getcompany").subscribe((data)=>
    {this.companydetails=data; console.log(data)})
    console.log(this.companydetails);
  }
  fetchSubject()
  {
    const params=new HttpParams().set("name",this.registrationForm.value.companyName);
    this.subjectdetails = this.http.get("https://localhost:44399/select?id="+this.company).subscribe((data)=>
    {this.subjectdetails=data; console.log(data);})
    console.log(this.subjectdetails);
    
    
  }
  fetchExamCheck()
  {
    var sid=sessionStorage.getItem("currentUser");;
    var eid=sessionStorage.getItem("ExamID");
    this.message = this.http.get("https://localhost:44399/checkreport?sid="+sid+"&&eid="+eid).subscribe((data)=>   //here sid comes from local storage
    {this.message=data["Message"]; console.log(data["Message"])

    if(data["Message"] == "T"){


      var res = this.http.get("   https://localhost:44399/getfileid?id="+eid).subscribe((data)=> {



      if(data == "Notthree"){

        alert("Exam is currently not available!!");
        this.router.navigate(['dashboard']);

      }
      else{


      sessionStorage.setItem("fileid1",JSON.stringify(data[0].FileID));
      sessionStorage.setItem("fileid2",JSON.stringify(data[1].FileID));
      sessionStorage.setItem("fileid3",JSON.stringify(data[2].FileID));
      console.log("Here exam id"+JSON.stringify(data[2].FileID));
      }
  
      });  //here sid comes from local storage
   
   

    }
    else if(this.message == "Error"){

      alert("Error")
    }

    
    
    })
    
  }
  getCompany()
    {
        //debugger;
        return this.http.get("https://localhost:44399/getcompany");
    }
    getSubject(cname:string) 
    {
        //debugger;
        return this.http.get("https://localhost:44399/select/"+cname);
    }
    checkExam() //Must come from local storage
    {
        //debugger;
        var sid=sessionStorage.getItem("currentUser");;
        var eid=sessionStorage.getItem("ExamID");
        return this.http.get("https://localhost:44399/checkreport?sid="+sid+"&&eid="+eid);
    }
}