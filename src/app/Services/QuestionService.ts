import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { QuestionComponent } from '../question/question.component';

@Injectable()
export class QuestionService //This is the one who talks between server (Web API) and client using HttpClient
{



    islevel1cleared:boolean =false;
    islevel2cleared:boolean= false;
    islevel3cleared: boolean = false;

    islevel1app: boolean = false;
    islevel2app: boolean = false;
    islevel3app: boolean = false;


    url : string = "https://localhost:44399/Read/";
    constructor(private http : HttpClient, private router: Router){

    }

    getQuestion(QueID:string){
        //debugger;
        return this.http.get(this.url + QueID);
    }




}