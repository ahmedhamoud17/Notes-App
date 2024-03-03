import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(notes:any[] , term:string): any {

    // return notes.filter(note=>note.title.toLowerCase().includes(term.toLocaleLowerCase()))

    if (!notes || !term) {
      return notes;
    }

    term = term.toLowerCase();

    return notes.filter(note => note.title.toLowerCase().includes(term));
  

  }

}