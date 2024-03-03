import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  isLoading: boolean = false
  apiError: string = ''
  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router) { }

  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z]).{8,25}$/)]),
  })


  HandleLogin(LoginForm: FormGroup) {
    this.isLoading = true
    this._AuthService.SignInMethod(LoginForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        if (res.message === 'success') {
          localStorage.setItem('token' , res.token)
          this._AuthService.DecodedMethod()
          this.SuccessToastr()
          this._Router.navigate(['/home'])
        }
        else {
          this.isLoading = false
          this.apiError = res.errors.email.message
          this.ErrorToastr()

        }
        console.log(res)
      }
    })
  }


  SuccessToastr() {
    this._ToastrService.success('Account Sign In Successfully')
  }
  ErrorToastr() {
    this._ToastrService.error('Account  Sign In Failed')
  }

  NavigateToSignUp(){
    this._Router.navigate(['/register'])
  }

}
