import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { SubjectserviceService } from '../services/subjectservice.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private renderer: Renderer2,private subjectService:SubjectserviceService) { }

  @ViewChild('sbar', {read: ElementRef}) private sbar:ElementRef; 

  ngOnInit() {
  }

  openNav(){
    this.renderer.setStyle(this.sbar['nativeElement'],'width','20%');
    this.subjectService.addSidebar('open');

  }

  closeNav(){
    this.renderer.setStyle(this.sbar['nativeElement'],'width',0);
    this.subjectService.addSidebar('close');
  }

}
