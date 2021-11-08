import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-delete-file',
  templateUrl: './delete-file.component.html',
  styleUrls: ['./delete-file.component.css']
})
export class DeleteFileComponent implements OnInit {
delFile:FormGroup
files:any
  constructor(private http:HttpClient, private router:Router) { 
    this.delFile=new FormGroup({
      file:new FormControl(null,Validators.required)
    })
  }
get file(){
  return this.delFile.get("file")
}
  ngOnInit(): void {
    this.fetchfiles()
  }
fetchfiles(){
this.files=this.http.get("https://localhost:44399/getallfiles").subscribe((data)=>{this.files=data;})

}
resp:string
deleteFile(){
  const params=new HttpParams().set("id",this.delFile.value.file)
  var res=this.http.delete("https://localhost:44399/removefile",{params}).subscribe(res=>{this.resp=res.toString();})
  
  alert("File successfully deleted!")
  this.router.navigateByUrl('/home',{skipLocationChange:true}).then(()=>{this.router.navigate(['delfile'])})
}

logout(){
  sessionStorage.clear();
}

}