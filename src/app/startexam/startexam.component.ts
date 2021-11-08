import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startexam',
  templateUrl: './startexam.component.html',
  styleUrls: ['./startexam.component.css']
})
export class StartexamComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    
   sessionStorage.setItem("examstarted","true");
  
  }

  // startexam(){
  //   sessionStorage.setItem("examstarted","true");
  //   alert(sessionStorage.getItem("examstarted"));
  //   this.router.navigate(['question'])
  // }
}
