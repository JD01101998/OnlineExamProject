import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';

import { NgxCaptchaModule } from 'ngx-captcha';
 
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';
import { SelectComponent } from './select/select.component';
import { QuestionComponent } from './question/question.component';
import { QuestionService } from './Services/QuestionService';
import {AuthGuardAdmin} from './Services/adminguard';
import {AuthGuardUser} from './Services/userguard';
import {AuthGuardStart} from './Services/startexamguard';
import { LevelScoreComponent } from './level-score/level-score.component';
import { ReportComponent } from './report/report.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { AddFileComponent } from './add-file/add-file.component';
import { DeleteFileComponent } from './delete-file/delete-file.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { StartexamComponent } from './startexam/startexam.component';
import { AuthGuardQuestion } from './Services/questionguard';
import { AuthGuardILevel } from './Services/ilevelguard';
import { AuthGuardReport } from './Services/reportguard';
import { CanDeactivateGuard } from './Services/candeact';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    ForgotPasswordComponent,
    ErrorPageComponent,
    UserdashboardComponent,
    SelectComponent,
    QuestionComponent,
    LevelScoreComponent,
    ReportComponent,
    AdminHomeComponent,
    AdminComponent,
    AddFileComponent,
    DeleteFileComponent,
    AddCompanyComponent,
    AboutusComponent,
    StartexamComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxCaptchaModule
  ],
  providers: [QuestionService, AuthGuardAdmin,AuthGuardUser, AuthGuardQuestion, AuthGuardStart, AuthGuardILevel, AuthGuardReport, CanDeactivateGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
