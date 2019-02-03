import { Component, OnInit } from '@angular/core';
import { SubjectserviceService } from '../services/subjectservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  search:string;
  constructor(private subjectService:SubjectserviceService) { }

  ngOnInit() {
  }

  addNote(){
    this.subjectService.addSidebar('add');
  }

  deleteNote(){
    this.subjectService.addSidebar('delete');
  }

  searchNotes(){
    if(this.search.length > 0){
      this.subjectService.isSearch = true;
    } else {
      this.subjectService.isSearch = false;
    }
    this.subjectService.searchParam = this.search.toLowerCase();
    this.subjectService.addSidebar('search');
  }

}
