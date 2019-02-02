import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, ViewChildren, QueryList } from '@angular/core';
import { SubjectserviceService } from '../services/subjectservice.service';
import { Note } from '../models/notes.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit,AfterViewInit {
  notes:Array<Note>;
  constructor(private renderer: Renderer2,private subjectService:SubjectserviceService) {
    this.notes = this.subjectService.notes.reverse();
   }

  @ViewChild('sbar', {read: ElementRef}) private sbar:ElementRef;
  @ViewChildren('diffnotes', {read:ElementRef}) private diffnotes:QueryList<ElementRef>;

  ngOnInit() {
    
  }

  ngAfterViewInit(){
    this.subjectService.getSidebar().subscribe(res => {
      switch(res){
        case 'add':{
          this.subjectService.notes.push(new Note());
          break;
        }
        case 'delete':{
          break;
        }
      }
      
    })
  }

  openNav(){
    this.renderer.setStyle(this.sbar['nativeElement'],'width','20%');
    this.subjectService.addSidebar('open');

  }

  closeNav(){
    this.renderer.setStyle(this.sbar['nativeElement'],'width',0);
    this.subjectService.addSidebar('close');
  }

  diffNotesAdd(index:any){
    let count = 0;
    this.diffnotes.forEach(el => {
      if (count!==index){
      this.renderer.removeStyle(el['nativeElement'],'background-color');
      } else {
        this.renderer.setStyle(el['nativeElement'],'background-color','lightblue');
      }
      count+=1;
    })
    // let newEl = this.diffnotes[index].nativeElement;
    // this.renderer.setStyle(newEl,'background-color','blue');
  }

}
