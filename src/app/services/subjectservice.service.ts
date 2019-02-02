import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectserviceService {
  private expandCloseSidebar = new Subject<any>();
  constructor() { }

  addSidebar(event:string){
    this.expandCloseSidebar.next(event);

  }

  getSidebar(){
    return this.expandCloseSidebar.asObservable();
  }
}
