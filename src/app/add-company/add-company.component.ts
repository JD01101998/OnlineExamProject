import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient,HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {
addCompany:FormGroup
comp:any={}
complist:any
a:boolean=false
headers=new Headers
  constructor(private http:HttpClient, private router: Router) {
    this.addCompany=new FormGroup({
      company:new FormControl(null,Validators.required),
      state:new FormControl(null,Validators.required),
      city:new FormControl(null,Validators.required)
    })
   }

  ngOnInit(): void {

    this.getC();

  }
get company(){
  return this.addCompany.get("company")
}
get state(){
  return this.addCompany.get("state")
}
get city(){
  return this.addCompany.get("city")
}

c1(){
  this.a=true;
  }
  getC(){
    this.complist=this.http.get("https://localhost:44399/getuniquecompany").subscribe(data=>this.complist=data)
  }
addC(){
  this.comp.CompanyName=this.addCompany.value.company
  this.comp.State=this.addCompany.value.state
  this.comp.City=this.addCompany.value.city
  console.log(this.comp)

  var res = this.http.post("https://localhost:44399/addcompany",JSON.stringify(this.comp), {headers:{'Content-Type': 'application/json'}})
  .subscribe(val=>console.log("done"));
 
  alert("Company Successfully Added")
  this.router.navigateByUrl('/home',{skipLocationChange: true}).then(()=> this.router.navigate(['addcompany']));
}


logout(){
  sessionStorage.clear();
}
}