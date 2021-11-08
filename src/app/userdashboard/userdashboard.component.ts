import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userdashboard',
  templateUrl: './userdashboard.component.html',
  styleUrls: ['./userdashboard.component.css']
})
export class UserdashboardComponent implements OnInit {

  report:any=[];
  reportlist:any
  sid:number;
  selectedValue:any=null;
  name:string = sessionStorage.getItem("email");
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    sessionStorage.setItem("currentUser",sessionStorage.getItem("Id"));
    this.sid=parseInt(sessionStorage.getItem("currentUser"));
    this.DisplayDashboard();
  }
  DisplayDashboard()
  {
    //alert(sessionStorage.getItem("examstarted"));
    this.report = this.http.get("https://localhost:44399/dashboard?sid="+this.sid).subscribe((data)=> //sid comes from local storage
    {this.report=data; console.log(data);
      this.reportlist = [...new Set(this.report.map(item => item.ExamName))];
     
    console.log(
      
      
      (this.report.length)
    
    )
    
    })
    console.log( this.report.length);
  }

logout(){
  alert("loggedout");

  sessionStorage.clear();
}



canDeactivate() {
  
  return confirm('Are you sure you want to leave the Exam?');
}

}