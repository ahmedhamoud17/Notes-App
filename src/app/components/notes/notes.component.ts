import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NoteDataComponent } from '../note-data/note-data.component';
import { NotesService } from '../../services/notes.service';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent implements OnInit {


  constructor(public dialog: MatDialog, private _NotesService: NotesService, private _AuthService: AuthService) { }

  NotesContainer: any[] = []
  value = '';

  openDialog() {
    const dialogRef = this.dialog.open(NoteDataComponent);
    dialogRef.afterClosed().subscribe({
      next: (res) => {
        if (res === "add") {
          this.GetUserNotes()
        }
      }
    })
  }


  ngOnInit(): void {
    this._NotesService.DecodedData(),
      this.GetUserNotes()
  }

  GetUserNotes() {

    const model = {
      token: localStorage.getItem('token'),
    }
    this._NotesService.GetNotesMethod(model).subscribe({
      next: (res) => {
        if (res.message === 'success') {
          this.NotesContainer = res.Notes
        }
        console.log(this.NotesContainer);

      }
    })

  }

  deleteNote(id: string, index: number) {
    const model = {
      NoteID: id,
      token: localStorage.getItem('token'),
    }
    this._NotesService.DeleteNotes(model).subscribe({
      next: (res) => {
        if (res.message === 'deleted') {
          this.NotesContainer.splice(index, 1)
          this.NotesContainer = [...this.NotesContainer]
          this.GetUserNotes()
          // console.log(res);
        }

      }
    })

  }

}



