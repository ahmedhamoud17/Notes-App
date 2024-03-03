import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  UserData = new BehaviorSubject(null)
  constructor(private _HttpClient: HttpClient , private _Router:Router) {
    if (localStorage.getItem('token') !== null) {
      this.DecodedMethod()
    }
  }

  SignUpMethod(data: object): Observable<any> {
    return this._HttpClient.post(`https://movies-api.routemisr.com/signup`, data)
  }
  SignInMethod(data: object): Observable<any> {
    return this._HttpClient.post(`https://movies-api.routemisr.com/signin`, data)
  }

  DecodedMethod() {
    let encodedToken = JSON.stringify(localStorage.getItem('token'))
    let decodedToken: any = jwtDecode(encodedToken)
    this.UserData.next(decodedToken)
    console.log(this.UserData)
  }

  LogOutMethod(){
    localStorage.removeItem('token')
    this.UserData.next(null)
    this._Router.navigate(['/login'])
  }


}
