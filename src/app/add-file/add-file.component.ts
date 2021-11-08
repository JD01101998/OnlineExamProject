import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-add-file',
  templateUrl: './add-file.component.html',
  styleUrls: ['./add-file.component.css']
})
export class AddFileComponent implements OnInit {
addForm:FormGroup
addNew:FormGroup
cname:any=[]
exams:any={}
a:boolean
b:boolean=true
question:any={}
eandq:any={}

headers = new Headers
  constructor(private http:HttpClient, private router : Router) {
    this.addForm=new FormGroup({
      filePath:new FormControl(null,[Validators.required]),
      company:new FormControl(null,[Validators.required]),
      level:new FormControl(null,[Validators.required]),
      eexam:new FormControl(null,[Validators.required])
    })
    this.addNew=new FormGroup({
      filePath1:new FormControl(null,[Validators.required]),
      filePath2:new FormControl(null,[Validators.required]),
      filePath3:new FormControl(null,[Validators.required]),
      company1:new FormControl(null,[Validators.required]),
      eexam1:new FormControl(null,[Validators.required]),
      subject:new FormControl(null,[Validators.required]),
    })
   }

  ngOnInit(): void {
    this.fetchcomp()
   
  }
submitFile(){
  
  this.question = {};
  this.question.FileName=this.addForm.value.filePath
  this.question.ExamID=this.addForm.value.eexam
  this.question.Level= this.addForm.value.level
  this.question.Del=1
  var res = this.http.post("https://localhost:44399/try",JSON.stringify(this.question), {headers:{'Content-Type': 'application/json'}})
  .subscribe(val=>console.log(val));

  alert("File successfully added to an existing exam");
  
  this.router.navigateByUrl('/home',{skipLocationChange: true}).then(()=> this.router.navigate(['addfile']));

  console.log(this.question)
}
submitnewfile(){
this.eandq.FileName=this.addNew.value.filePath1
this.eandq.CompanyName=this.addNew.value.company1
this.eandq.ExamName=this.addNew.value.eexam1
this.eandq.Subject=this.addNew.value.subject
this.eandq.Level= 1
this.eandq.Del=1
console.log(this.eandq)
var res=this.http.post("https://localhost:44399/try2",JSON.stringify(this.eandq),{headers:{'Content-Type': 'application/json'}}).subscribe
(val=>{console.log(val);


this.question = {}

this.question.FileName=this.addNew.value.filePath2
  this.question.ExamID = val
  this.question.Level= 2
  this.question.Del=1
  var res = this.http.post("https://localhost:44399/try",JSON.stringify(this.question), {headers:{'Content-Type': 'application/json'}})
  .subscribe(val=>console.log("done"));
  console.log(this.question)

  
this.question = {}

this.question.FileName=this.addNew.value.filePath3
  this.question.ExamID= val
  this.question.Level= 3
  this.question.Del=1
  var res = this.http.post("https://localhost:44399/try",JSON.stringify(this.question), {headers:{'Content-Type': 'application/json'}})
  .subscribe(val=>console.log("done"));
  console.log(this.question)



  
  alert("Files successfully added to a new exam!");
  
  this.router.navigateByUrl('/home',{skipLocationChange: true}).then(()=> this.router.navigate(['addfile']));


});





}
get filePath(){
  return this.addForm.get("filePath")
}
get eexam(){
  return this.addForm.get("eexam")
}
get company(){
  return this.addForm.get("company")
}
get level(){
  return this.addForm.get("level")
}
get filePath2(){
  return this.addNew.get("filePath2")
}
get filePath3(){
  return this.addNew.get("filePath3")
}
get filePath1(){
  return this.addNew.get("filePath1")
}
get eexam1(){
  return this.addNew.get("eexam1")
}
get company1(){
  return this.addNew.get("company1")
}
get level1(){
  return this.addNew.get("level1")
}
get subject(){
  return this.addNew.get("subject")
}
fetchcomp(){
  this.cname=this.http.get("https://localhost:44399/getuniquec").subscribe((data)=>{this.cname=data;})
  }
  fetchexam(){
    const params=new HttpParams().set("name",this.addForm.value.company);
    this.exams=this.http.get("https://localhost:44399/getuniqueeid?",{params}).subscribe((data)=>{this.exams=data;})
    }
c1(){
this.a=true
this.b=false
console.log("abc")
}
c2(){
  this.b=true
  this.a=false
  console.log("xyz")
  }

  
logout(){
  sessionStorage.clear();
}
}