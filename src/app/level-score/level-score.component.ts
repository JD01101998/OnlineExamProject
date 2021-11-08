import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpParams} from '@angular/common/http';
import { FormBuilder, Validators } from "@angular/forms";
import { FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-level-score',
  templateUrl: './level-score.component.html',
  styleUrls: ['./level-score.component.css']
})
export class LevelScoreComponent implements OnInit {
  eid=sessionStorage.getItem("ExamID");
  //eid=2;
  sid=sessionStorage.getItem("currentUser");  report:any;
  constructor(private http:HttpClient) { }

  level_no:string = sessionStorage.getItem("level_no");
  level_score:string = sessionStorage.getItem("level_score");


  ngOnInit(): void {
    //this.fetchReport();
  }
  fetchReport()
  {
    this.report = this.http.get("https://localhost:44399/getlevelreport?sid="+this.sid+"&&eid="+this.eid+"&&lid=1").subscribe((data)=>
    {this.report=data; console.log(data)})
    console.log(this.report);
  }
}