import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Note } from '../models/notes.model';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {
  notes:Array<Note>;
  private expandCloseSidebar = new Subject<any>();

  constructor() {
    this.notes = [];
   }

  addSidebar(event:string){
    this.expandCloseSidebar.next(event);

  }

  getSidebar(){
    return this.expandCloseSidebar.asObservable();
  }
}
