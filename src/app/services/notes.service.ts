import { HttpClient, } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class NotesService {

  UserData: any;



  constructor(private _HttpClient: HttpClient, private _Router: Router) {
    this.DecodedData()
  }

  DecodedData() {
    let encodedData = JSON.stringify(localStorage.getItem('token'))
    let decodedToken: any = jwtDecode(encodedData)
    this.UserData = decodedToken
    let id = this.UserData._id
    // console.log(this.UserData._id)
  }


  AddNoteMethod(data: object): Observable<any> {
    return this._HttpClient.post(`https://movies-api.routemisr.com/addNote`, data)
  }


  // header :any = {
  //     Token:localStorage.getItem('token'),
  //     userID:this.UserData._id
  // }
  GetNotesMethod(data: object): Observable<any> {
    return this._HttpClient.post(`https://movies-api.routemisr.com/getUserNotes`, data)
  }


  DeleteNotes(data:object): Observable<any> {
    const model = {
     body:data
    }
    return this._HttpClient.delete(`https://movies-api.routemisr.com/deleteNote`, model)
  }

















  // AddNoteMethod(data: object): Observable<any> {
  //   return this._HttpClient.post(`https://movies-api.routemisr.com/addNote`, data)
  // }

  // GetUserNotes(data: object): Observable<any> {
  //   return this._HttpClient.post(`https://movies-api.routemisr.com/getUserNotes`, data)
  // }

  // DeleteNote(data: object): Observable<any> {
  //   console.log(data);

  //   return this._HttpClient.delete(`https://movies-api.routemisr.com/deleteNote`, {body:data})

  // }


}
