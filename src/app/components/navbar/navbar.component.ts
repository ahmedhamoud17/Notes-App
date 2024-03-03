import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {


  isLogin:boolean = false
  constructor(private _AuthService:AuthService){
    this._AuthService.UserData.subscribe({
      next:()=>{
        if(this._AuthService.UserData.getValue() !== null ){
          this.isLogin = true
        }
        else{
          this.isLogin = false
        }
      }
    })
  }

  LogOut(){
    this._AuthService.LogOutMethod()
  }


}
