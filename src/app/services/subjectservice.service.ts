import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {
  currentSelectedIndex:any;
  notes:Array<Note>;
  editedDate:Date;
  searchParam:string;
  private expandCloseSidebar = new Subject<any>();
  private passNoteData = new Subject<any>();

  constructor() {
    
    if(localStorage.getItem('savedNotes') !== null) {
    this.notes = JSON.parse(localStorage.getItem('savedNotes'));
    } else {
      this.notes = [];
    }
    this.currentSelectedIndex = 0;
   }

  addSidebar(event:string){
    this.expandCloseSidebar.next(event);

  }

  getSidebar(){
    return this.expandCloseSidebar.asObservable();
  }

  addNoteData(event){
    this.passNoteData.next(event);
  }

  getNoteData(){
    return this.passNoteData.asObservable();
  }

  saveNotesJSON(){
    localStorage.setItem('savedNotes', JSON.stringify(this.notes));
  }

  
}
