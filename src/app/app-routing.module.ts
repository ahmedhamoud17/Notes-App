import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { NotesComponent } from './components/notes/notes.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo: 'home' , pathMatch:'full'},
  {path:'home' , component:HomeComponent},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'about',  component:AboutComponent},
  {path:'notes', canActivate:[authGuard]  , component:NotesComponent},
  {path:'**'  , component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
