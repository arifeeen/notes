import { Component, OnInit } from '@angular/core';
import { SubjectserviceService } from '../services/subjectservice.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private subjectService:SubjectserviceService) { }

  ngOnInit() {
  }

  addNote(){
    this.subjectService.addSidebar('add');
  }

  deleteNote(){
    this.subjectService.addSidebar('delete');
  }

}
