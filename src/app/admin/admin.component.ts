import { HttpClient,HttpParams} from '@angular/common/http';

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


import * as XLSX from 'xlsx';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
techno:any=[]
examnames:any=[]
cname:any=[]
scity:any=[]

fdetail1:any
fileName:string
a:boolean=false;
b:boolean=false;
c:boolean=false;

  constructor(private http:HttpClient) {
    this.FilterForm=new FormGroup({
      company:new FormControl(null,Validators.required),
      exam:new FormControl(null,Validators.required),
      tech:new FormControl(null,Validators.required),
      city:new FormControl(null,Validators.required),
      state:new FormControl(null,Validators.required),
      level:new FormControl(null,Validators.required),
      marks:new FormControl(null,Validators.required),
      level1:new FormControl(null,Validators.required),
      level2:new FormControl(null,Validators.required),
      marks1:new FormControl(null,Validators.required),
      marks2:new FormControl(null,Validators.required)

    })
  }
   

  ngOnInit(): void {
    this.fetchtech()
    
    this.fetchcomp()
    
  
  }
FilterForm:FormGroup
get company(){
  return this.FilterForm.get("company")
}
get exam(){
  return this.FilterForm.get("exam")
}
get tech(){
  return this.FilterForm.get("tech")
}
get state(){
  return this.FilterForm.get("state")
}
get city(){
  return this.FilterForm.get("city")
}
get level(){
  return this.FilterForm.get("level")
}
get level1(){
  return this.FilterForm.get("level1")
}
get level2(){
  return this.FilterForm.get("level2")
}
get marks(){
  return this.FilterForm.get("marks")
}
get marks1(){
  return this.FilterForm.get("marks1")
}
get marks2(){
  return this.FilterForm.get("marks2")
}


fetchtech(){
this.techno=this.http.get("https://localhost:44399/getuniquet").subscribe((data)=>{this.techno=data;})
}
fetchexam(){
const params=new HttpParams().set("name",this.FilterForm.value.company);
this.examnames=this.http.get("https://localhost:44399/getuniquee?",{params}).subscribe((data)=>{this.examnames=data;})
}
fetchcomp(){
this.cname=this.http.get("https://localhost:44399/getuniquec").subscribe((data)=>{this.cname=data;})
}
fetchStud(){
  const params=new HttpParams().set("state",this.FilterForm.value.state)
this.scity=this.http.get("https://localhost:44399/getuniques?",{params}).subscribe((data)=>{this.scity=data;})
}
sendDetails1(){
  this.fdetail1=null;
  this.fileName=null;
  const params= new HttpParams().set("cname",this.FilterForm.value.company).set("ename",this.FilterForm.value.exam)
  .set("level",this.FilterForm.value.level).set("marks",this.FilterForm.value.marks);
  this.fdetail1=this.http.get("https://localhost:44399/reportquery1?",{params}).subscribe((data)=>this.fdetail1=data)
  console.log("https://localhost:44399/reportquery1?"+params.toString())
  this.fileName=this.FilterForm.value.company+"_"+this.FilterForm.value.exam+"_L"+this.FilterForm.value.level+
  "_M"+this.FilterForm.value.marks+".xlsx"
 
}
sendDetails2(){
  this.fdetail1=null;
  this.fileName=null;
  const params= new HttpParams().set("tname",this.FilterForm.value.tech)
  .set("level",this.FilterForm.value.level1).set("marks",this.FilterForm.value.marks1);
  this.fdetail1=this.http.get("https://localhost:44399/reportquery2?",{params}).subscribe((data)=>this.fdetail1=data)
  this.fileName=this.FilterForm.value.tech+"_L"+this.FilterForm.value.level+
  "_M"+this.FilterForm.value.marks+".xlsx"
}
sendDetails3(){
  this.fdetail1=null;
  this.fileName=null;
  const params= new HttpParams().set("state",this.FilterForm.value.state).set("city",this.FilterForm.value.city)
  .set("level",this.FilterForm.value.level2).set("marks",this.FilterForm.value.marks2);
  this.fdetail1=this.http.get("https://localhost:44399/reportquery3?",{params}).subscribe((data)=>this.fdetail1=data)
  this.fileName=this.FilterForm.value.state+"_"+this.FilterForm.value.city+"_L"+this.FilterForm.value.level+
  "_M"+this.FilterForm.value.marks+".xlsx"
}
export(){
  let element = document.getElementById('excel-table'); 
  const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  XLSX.writeFile(wb, this.fileName);
}
c1(){
  this.a=true;
  this.b=false;
  this.c=false;
}
c2(){
  this.a=false;
  this.b=true;
  this.c=false;
}
c3(){
  this.c=true;
  this.b=false;
  this.a=false;
}


logout(){
  sessionStorage.clear();
}
}