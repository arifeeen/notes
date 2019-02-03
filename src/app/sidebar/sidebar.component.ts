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
  currentIndex:any;
  constructor(private renderer: Renderer2,private subjectService:SubjectserviceService) {
    this.notes = this.subjectService.notes.slice().reverse();
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
            
          this.notes = this.subjectService.notes.slice().reverse();
          setTimeout(() => {
            this.diffNotesAdd(0);
          },1)
          this.subjectService.saveNotesJSON();

          break;
        }
        case 'delete':{
          let length = this.notes.length;
          if (length === 0) {
            alert('No notes to delete');
          } else if(length >= 1){
            this.subjectService.notes.splice(this.subjectService.currentSelectedIndex,1);
            this.notes = this.subjectService.notes.slice().reverse();
            if (length === 1) {
              return ;
            }
            else if(this.subjectService.currentSelectedIndex !== length - 1) {
              this.diffNotesAdd(this.subjectService.currentSelectedIndex);

            } else {
              this.diffNotesAdd(this.subjectService.currentSelectedIndex - 1);
            }

          }
          this.subjectService.saveNotesJSON();
          break;
        }

        case 'search':{
          let searchParam = this.subjectService.searchParam;
          this.notes = this.subjectService.notes.slice().reverse();
          this.notes = this.notes.filter(note => {
            return this.searchNote(note,searchParam);

          })

        }
      }
      
    });
    

    this.subjectService.getNoteData().subscribe(res => {
      let updateLabel = res.trim();
      updateLabel = updateLabel.split(/\r?\n/);
      this.notes[this.currentIndex].label = (updateLabel[0] !== '' ? updateLabel[0] : 'New Note Created').trim();
      this.notes[this.currentIndex].body = (updateLabel.slice(1).join('\n') !== '' ? updateLabel.slice(1).join('\n') : 'No additional Text Content').trim();
      this.notes[this.currentIndex].date = this.subjectService.editedDate;
      this.subjectService.notes = this.notes.slice().reverse();
      this.subjectService.saveNotesJSON();
    });

    this.diffNotesAdd(0);
  }

  searchNote(note:Note,searchParam:string){
    let index1 = note.label.toLowerCase().search(searchParam);
    let index2 = note.body.toLowerCase().search(searchParam);
    if(index1 === -1 && index2 === -1){
      return false
    }
    return true;
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
    this.currentIndex = index;
    let count = 0;
    this.diffnotes.forEach(el => {
      if (count!==index){
      this.renderer.removeStyle(el['nativeElement'],'background-color');
      } else {
        this.renderer.setStyle(el['nativeElement'],'background-color','lightblue');
      }
      count+=1;
    });
    this.subjectService.currentSelectedIndex = this.diffnotes.length - index - 1;
    this.subjectService.addSidebar('bind');

  }

}
