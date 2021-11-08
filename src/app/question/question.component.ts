import { PlatformLocation } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,ViewChild, ElementRef , OnInit, HostListener } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { SubscriptionLike } from 'rxjs';
import { QuestionService} from '../Services/QuestionService';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css'],
})
export class QuestionComponent implements OnInit {
  QuestionDetails: any =[];
  AttemptedAnswer:string[] = new Array(11);  
  CorrectAnswer: string[] = new Array(11);
  levelnumber:number = 0;
  rem : boolean[] = Array(11)
  RememberMe : boolean
  userid:string;
  examname:string;
  Score : number = 0;
  current : number = 1;
  interval;
  clsname1 = "clsname btn btn-default"
  clsname2 = "clsname btn btn-default"
  clsname3 = "clsname btn btn-default"
  clsname4 = "clsname btn btn-default"
  clsname5 = "clsname btn btn-default"
  clsname6 = "clsname btn btn-default"
  clsname7 = "clsname btn btn-default"
  clsname8 = "clsname btn btn-default"
  clsname9 = "clsname btn btn-default"
  clsname10 = "clsname btn btn-default"
  constructor(private QuestionService : QuestionService, private router: Router, private http: HttpClient) {


   }

  ngOnInit(): void {


//         @HostListener('window:popstate')
//   onpopstate() {
//     this.router.navigate(['stoebern']);
//     this.modalService.dismissAll();
//   }

        this.userid = sessionStorage.getItem("email");
        this.examname = sessionStorage.getItem("examname");
    this.callQuestions();
    console.log(this.current)
  }

  callQuestions(){

        console.log(sessionStorage.getItem("fileid1"));
        console.log(this.QuestionService.islevel1app);

        if(sessionStorage.getItem("l1app") == "false"){
        this.levelnumber = 1;
        this.fetchQuestions(sessionStorage.getItem("fileid1"));
        }
        else if(sessionStorage.getItem("l2app") == "false" && sessionStorage.getItem("l1app") == "true"){
                
        this.levelnumber = 2;
        this.fetchQuestions(sessionStorage.getItem("fileid2"));
        }
        else if(sessionStorage.getItem("l3app") == "false" && sessionStorage.getItem("l2app") == "true"){
                
                this.levelnumber = 3;
                this.fetchQuestions(sessionStorage.getItem("fileid3"));
                }
  }


  id=1;
  fetchQuestions(id:string)
  { 
    this.QuestionDetails = this.QuestionService.getQuestion(id).subscribe(data=>
    {
      this.QuestionDetails = data;
      console.log(this.QuestionDetails);
      this.Calldemo();
      this.startTimer()
    })
    
  }
  Calldemo()
  {
    for(let i=0;i<=10;i++)
    {
      //console.log(this.QuestionDetails[i].Ans);
      this.CorrectAnswer[i] = this.QuestionDetails[i].Ans
      console.log(this.CorrectAnswer[i])
      this.AttemptedAnswer[i] = "Hello";
      this.rem[i] = false
    }
  }
  displayNext()
  {   
      this.current = this.current + 1;
      this.Jump(this.current)
      console.log(this.current)  
  }
  displayPrevious()
  {
      this.current = this.current - 1;
      this.Jump(this.current)
      console.log(this.current)
  }
  Jump(QueNo:number)
  {
    if(!this.rem[this.current])
    {
      this.RememberMe = false
    }
    else
    {
      this.RememberMe = true
    }
    this.current = QueNo;
  } 
  check(res:string)
  {
    this.AttemptedAnswer[this.current] = res;
    if(!this.rem[this.current])
    {
      switch(this.current)
      {
        case 1 : this.clsname1 = "clsname btn btn-success"
                break
        case 2 : this.clsname2 = "clsname btn btn-success"
                break
        case 3 : this.clsname3 = "clsname btn btn-success"
                break
        case 4 : this.clsname4 = "clsname btn btn-success"
                break
        case 5 : this.clsname5 = "clsname btn btn-success"
                break 
        case 6 : this.clsname6 = "clsname btn btn-success"
                break
        case 7 : this.clsname7 = "clsname btn btn-success"
                break
        case 8 : this.clsname8 = "clsname btn btn-success"
                break
        case 9 : this.clsname9 = "clsname btn btn-success"
                break
        case 10 : this.clsname10 = "clsname btn btn-success"
                break
      }
    }
    console.log("Attempted Ans : " + res);
    console.log("Correct Ans : " + this.CorrectAnswer[this.current]);
  }
  Remember()
  {
    //var element = <HTMLInputElement> document.getElementById("Quick");
    this.rem[this.current] = !this.rem[this.current]; 
    var element = this.rem[this.current]
      if(element)
      {
        switch(this.current)
        {
          case 1 : this.clsname1 = "clsname btn btn-primary"
                  break
          case 2 : this.clsname2 = "clsname btn btn-primary"
                  break
          case 3 : this.clsname3 = "clsname btn btn-primary"
                  break
          case 4 : this.clsname4 = "clsname btn btn-primary"
                  break
          case 5 : this.clsname5 = "clsname btn btn-primary"
                  break 
          case 6 : this.clsname6 = "clsname btn btn-primary"
                  break
          case 7 : this.clsname7 = "clsname btn btn-primary"
                  break
          case 8 : this.clsname8 = "clsname btn btn-primary"
                  break
          case 9 : this.clsname9 = "clsname btn btn-primary"
                  break
          case 10 : this.clsname10 = "clsname btn btn-primary"
                  break
        }
      }
      else if(this.AttemptedAnswer[this.current] === "Hello")
      {
        switch(this.current)
        {
          case 1 : this.clsname1 = "clsname btn btn-default"
                  break
          case 2 : this.clsname2 = "clsname btn btn-default"
                  break
          case 3 : this.clsname3 = "clsname btn btn-default"
                  break
          case 4 : this.clsname4 = "clsname btn btn-default"
                  break
          case 5 : this.clsname5 = "clsname btn btn-default"
                  break 
          case 6 : this.clsname6 = "clsname btn btn-default"
                  break
          case 7 : this.clsname7 = "clsname btn btn-default"
                  break
          case 8 : this.clsname8 = "clsname btn btn-default"
                  break
          case 9 : this.clsname9 = "clsname btn btn-default"
                  break
          case 10 : this.clsname10 = "clsname btn btn-default"
                  break
        }
      }
      else
      {
        this.check(this.AttemptedAnswer[this.current])
      }
  }

  level1score:number = 0;
  level2score:number = 0;
  level3score: number = 0;  

  report:any={};

  OnSubmit()
  {  

     if(sessionStorage.getItem("l1app") == "false"){   


    for(let i=1;i<=10;i++)
    {
      if(this.CorrectAnswer[i]===this.AttemptedAnswer[i])
      {
         this.Score = this.Score + 1;
      }
    }
    this.QuestionService.islevel1app = true;
    this.AttemptedAnswer = [];
    this.CorrectAnswer = [];

    sessionStorage.setItem("l1app","true");
    console.log("Your level1 Score is : " + this.Score);
    if(this.Score >5){
        alert("inside if"+this.Score);
            this.QuestionService.islevel1cleared = true;
            sessionStorage.setItem("Level1Score", this.Score.toString());
            
            //this.fetchQuestions(sessionStorage.getItem("fileid2"));
            this.QuestionService.islevel1app = true;

            this.pauseTimer(); 
   sessionStorage.setItem("level_no","1");
   sessionStorage.setItem("level_score",sessionStorage.getItem("Level1Score"));
   this.Score = 0;
            this.router.navigate(['ilevel'], {replaceUrl:true})
            //this.router.navigateByUrl('/home', {skipLocationChange: true}).then(()=>{ this.router.navigate(['question'])});  
            
    }
    else{
            sessionStorage.setItem("Level1Score", this.Score.toString());
            sessionStorage.setItem("Level2Score", "NULL");
            sessionStorage.setItem("Level3Score", "NULL");

            this.pauseTimer(); 

            
    var sid=sessionStorage.getItem("currentUser");;
    var eid=sessionStorage.getItem("ExamID");
            this.report.StudentID = sid;
            this.report.ExamID = eid;
            this.report.Level1_Score = sessionStorage.getItem("Level1Score");
            this.report.Level2_Score = sessionStorage.getItem("Level2Score");
            this.report.Level3_Score = sessionStorage.getItem("Level3Score");
            this.report.Date = new Date();

            console.log("report here "+this.report);
            
            
    var res = this.http.post("https://localhost:44399/postreport",JSON.stringify(this.report), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res => {
    
    console.log(res);
    
    this.router.navigate(['report'],{replaceUrl:true});
  })
    .catch(err=> alert(err));
    }
}

else if(sessionStorage.getItem("l2app") == "false" && sessionStorage.getItem("l1app") == "true"){

        
        sessionStorage.setItem("l2app","true");

        for(let i=1;i<=10;i++)
    {
      if(this.CorrectAnswer[i]===this.AttemptedAnswer[i])
      {
         this.Score = this.Score + 1;
      }
    }
    this.QuestionService.islevel2app = true;
    this.AttemptedAnswer = [];
    this.CorrectAnswer = [];

    console.log("Your level2 Score is : " + this.Score);
    if(this.Score >5){
        this.QuestionService.islevel2cleared = true;
        this.QuestionService.islevel2app = true;
        
        sessionStorage.setItem("Level2Score", this.Score.toString());
        //this.Score = 0;
        
        this.fetchQuestions(sessionStorage.getItem("fileid3"));

        this.pauseTimer(); 
   sessionStorage.setItem("level_no","2");
   sessionStorage.setItem("level_score",sessionStorage.getItem("Level2Score"));
   this.Score = 0;
            this.router.navigate(['ilevel'],{replaceUrl:true});
        //this.router.navigate(['question']);
}
else{
        this.pauseTimer(); 
        sessionStorage.setItem("Level2Score", this.Score.toString());
        
        sessionStorage.setItem("Level3Score", "NULL");
        var sid=sessionStorage.getItem("currentUser");;
    var eid=sessionStorage.getItem("ExamID");
            this.report.StudentID = sid;
            this.report.ExamID = eid;
            this.report.Level1_Score = sessionStorage.getItem("Level1Score");
            this.report.Level2_Score = sessionStorage.getItem("Level2Score");
            this.report.Level3_Score = sessionStorage.getItem("Level3Score");
            this.report.Date = new Date();
            
            
    var res = this.http.post("https://localhost:44399/postreport",JSON.stringify(this.report), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res => {
        this.router.navigate(['report'],{replaceUrl:true});
  })
    .catch(err=> alert(err));
}
}


else if(sessionStorage.getItem("l3app") == "false" && sessionStorage.getItem("l2app") == "true" && sessionStorage.getItem("l1app") == "true"){

        
        sessionStorage.setItem("l3app","true");
        for(let i=1;i<=10;i++)
    {
      if(this.CorrectAnswer[i]===this.AttemptedAnswer[i])
      {
         this.Score = this.Score + 1;
      }
    }
    this.QuestionService.islevel1app = true;
    this.AttemptedAnswer = [];
    this.CorrectAnswer = [];

    console.log("Your level2 Score is : " + this.Score);
    if(this.Score >5){
        this.QuestionService.islevel3cleared = true;
        this.QuestionService.islevel3app = true;
        this.pauseTimer(); 
        sessionStorage.setItem("Level3Score", this.Score.toString());
        this.Score = 0;

        var sid=sessionStorage.getItem("currentUser");;
    var eid=sessionStorage.getItem("ExamID");
            this.report.StudentID = sid;
            this.report.ExamID = eid;
            this.report.Level1_Score = sessionStorage.getItem("Level1Score");
            this.report.Level2_Score = sessionStorage.getItem("Level2Score");
            this.report.Level3_Score = sessionStorage.getItem("Level3Score");
            this.report.Date = new Date();
            
            
    var res = this.http.post("https://localhost:44399/postreport",JSON.stringify(this.report), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res => {
        this.router.navigate(['report'], {replaceUrl:true});
  })
    .catch(err=> alert(err));


}
else{
        this.pauseTimer(); 
        sessionStorage.setItem("Level3Score", this.Score.toString());
        var sid=sessionStorage.getItem("currentUser");;
    var eid=sessionStorage.getItem("ExamID");
            this.report.StudentID = sid;
            this.report.ExamID = eid;
            this.report.Level1_Score = sessionStorage.getItem("Level1Score");
            this.report.Level2_Score = sessionStorage.getItem("Level2Score");
            this.report.Level3_Score = sessionStorage.getItem("Level3Score");
            this.report.Date = new Date();
            
            
    var res = this.http.post("https://localhost:44399/postreport",JSON.stringify(this.report), {headers:{'Content-Type': 'application/json'}}).toPromise().then(res => {
        this.router.navigate(['report'], {replaceUrl:true});
  })
    .catch(err=> alert(err));
}
}


  }
  startTimer() {
    var distance = 600;
    this.interval = setInterval(() => {
      if(distance > 0) {      
    var minutes = Math.floor(distance / 60);
    var seconds = Math.floor(distance % 60);
    //console.log(minutes,seconds) 
    distance--
    document.getElementById("demo1").innerHTML = minutes + "m " + seconds + "s ";
      } else {
        alert("Time's up")
        this.OnSubmit();
      }
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
}


