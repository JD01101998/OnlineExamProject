import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutusComponent } from './aboutus/aboutus.component';
import { AddCompanyComponent } from './add-company/add-company.component';
import { AddFileComponent } from './add-file/add-file.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin/admin.component';
import { DeleteFileComponent } from './delete-file/delete-file.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { HomeComponent } from './home/home.component';
import { LevelScoreComponent } from './level-score/level-score.component';
import { QuestionComponent } from './question/question.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReportComponent } from './report/report.component';
import { SelectComponent } from './select/select.component';
import { AuthGuardAdmin } from './Services/adminguard';
import { CanDeactivateGuard } from './Services/candeact';
import { AuthGuardILevel } from './Services/ilevelguard';
import { AuthGuardQuestion } from './Services/questionguard';
import { AuthGuardReport } from './Services/reportguard';
import { AuthGuardStart } from './Services/startexamguard';
import { AuthGuardUser } from './Services/userguard';
import { StartexamComponent } from './startexam/startexam.component';
import { UserdashboardComponent } from './userdashboard/userdashboard.component';

const routes: Routes = [
  {path:"",redirectTo:"home",pathMatch:'full'},
  {path:"home",component:HomeComponent},
  {path:"register",component:RegistrationComponent},
  {path:"forgotpassword", component:ForgotPasswordComponent},


  {path:"dashboard", component:UserdashboardComponent, canActivate:[AuthGuardUser]},


  {path:"company",component:SelectComponent,canActivate:[AuthGuardUser]},
  {path:"question", component:QuestionComponent, canActivate:[AuthGuardQuestion]},
  {path:"ilevel", component:LevelScoreComponent, canActivate:[AuthGuardILevel]},
  

  {path:"report", component:ReportComponent,canActivate:[AuthGuardReport]},

  {path:"adminhome", component:AdminHomeComponent, canActivate:[AuthGuardAdmin]},
  {path:"admin", component:AdminComponent,canActivate:[AuthGuardAdmin]},
  {path:"addfile", component:AddFileComponent,canActivate:[AuthGuardAdmin]},
  {path:"delfile", component:DeleteFileComponent,canActivate:[AuthGuardAdmin]},
  {path:"addcompany", component:AddCompanyComponent,canActivate:[AuthGuardAdmin]},
  {path:"aboutus", component:AboutusComponent, canActivate:[AuthGuardUser]},


  {path:"startexam", component:StartexamComponent,canActivate:[AuthGuardStart]},

  {path:"**",component:ErrorPageComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
