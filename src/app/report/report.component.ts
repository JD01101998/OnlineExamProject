import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { FormControl, FormGroup} from '@angular/forms';
import html2canvas from 'html2canvas';
import jspdf from 'jspdf';
import { Router } from '@angular/router';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  uid:string;
  report:any;
  examdetails:any;
  eid=sessionStorage.getItem("ExamID");
  sid=sessionStorage.getItem("currentUser");
  name:string = sessionStorage.getItem("email");
  constructor(private http:HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.uid=sessionStorage.getItem("Email");///Comes from login
    this.fetchReport();
    this.fetchExamDetails();
  }
  fetchReport()
  {
    console.log(this.sid)
    console.log(this.eid)
    this.report = this.http.get("https://localhost:44399/getreport?sid="+this.sid+"&&eid="+this.eid).subscribe((data)=> //sid comes from local storage
    {this.report=data; console.log(data)})
    console.log(this.report);
  }
  fetchExamDetails()
  {
    this.examdetails = this.http.get("https://localhost:44399/api/exam/"+this.eid).subscribe((data1)=>  //eid comes from local storage
    {this.examdetails=data1; console.log(data1)})
    console.log(this.examdetails);
  }


  public captureScreen()  
  {  
    var data = document.getElementById('contentToConvert');  
    html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 205;
      var imgHeight = 158;  
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save(''+this.report.CompanyName+'_'+this.examdetails.ExamName+'.pdf'); // Generated PDF   
    });  
  }

nav(){

  sessionStorage.setItem("examstarted","false");
    

}


}