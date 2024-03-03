import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { NotesService } from '../../services/notes.service';
import { MatDialogRef } from '@angular/material/dialog';
import { NotesComponent } from '../notes/notes.component';
import { jwtDecode } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-note-data',
  templateUrl: './note-data.component.html',
  styleUrl: './note-data.component.css'
})
export class NoteDataComponent implements OnInit {


  constructor(private _NotesService: NotesService, private MatDialogRef:MatDialogRef<NoteDataComponent> , private _ToastrService:ToastrService ) { }
  isLoading:boolean = false

  NoteForm: FormGroup = new FormGroup({
    title: new FormControl(null, [Validators.required]),
    desc: new FormControl(null, [Validators.required]),
  })

  ngOnInit(): void {
    this._NotesService.DecodedData()
    // console.log(this._NotesService.UserData._id);
    // let Token = localStorage.getItem('token');
    // let UserId = this._NotesService.UserData._id;

  }

  AddNote(NoteForm: FormGroup) {

    const data = {
      ...this.NoteForm.value,
      userID: this._NotesService.UserData._id,
      token: localStorage.getItem('token')
    }

    if (NoteForm.valid) {
      this.isLoading = true
      console.log(data);
      this._NotesService.AddNoteMethod(data).subscribe({
        next:(res)=>{
          this.isLoading = false
          if( res.message === "success")
          {
            this.MatDialogRef.close('add')
            this.SuccessToastr()

          }
          console.log(res);
        },
        error:(err)=>{
          console.log(err),
          this.ErrorToastr()
        }
      })
    }

  }

  SuccessToastr() {
    this._ToastrService.success('Note Added Successfully')
  }
  ErrorToastr() {
    this._ToastrService.error('Failed To Add Note')
  }


}
