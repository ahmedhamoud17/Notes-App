import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  isLoading: boolean = false
  apiError: string = ''
  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router) { }

  RegisterForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
    last_name: new FormControl(null, [Validators.required, Validators.maxLength(20), Validators.minLength(5)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*[a-zA-Z]).{8,25}$/)]),
    age: new FormControl(null, [Validators.required, Validators.min(12), Validators.max(60)])
  })


  HandleRegister(RegisterForm: FormGroup) {
    this.isLoading = true
    this._AuthService.SignUpMethod(RegisterForm.value).subscribe({
      next: (res) => {
        this.isLoading = false
        if (res.message === 'success') {
          this.SuccessToastr()
          this._Router.navigate(['/login'])
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
    this._ToastrService.success('Account Registered Successfully')
  }
  ErrorToastr() {
    this._ToastrService.error('Account Registered Failed')
  }

}
