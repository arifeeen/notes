import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SubjectserviceService } from '../services/subjectservice.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, AfterViewInit {
  today: Date = new Date();
  noteData: string = ''
  @ViewChild("menu", { read: ElementRef }) private mnu: ElementRef;
  @ViewChild("txtarea", { read: ElementRef }) private txtarea: ElementRef;

  constructor(private renderer: Renderer2, private subjectSevice: SubjectserviceService) {
    setInterval(() => {
      this.today = new Date();
    }, 1);
  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.subjectSevice.getSidebar().subscribe(res => {
      switch (res) {

        case 'open': {
          this.renderer.setStyle(this.mnu['nativeElement'], 'left', '20%');
          this.renderer.setStyle(this.mnu['nativeElement'], 'width', '80%');
          break;
        }
        case 'close': {
          this.renderer.setStyle(this.mnu['nativeElement'], 'left', '5%');
          this.renderer.setStyle(this.mnu['nativeElement'], 'width', '95%');
          break;
        }
        case 'add': {
          break;
        }
        case 'delete': {
          break;
        }
        case 'bind': {
          let label = this.subjectSevice.notes[this.subjectSevice.currentSelectedIndex].label;
          let body = this.subjectSevice.notes[this.subjectSevice.currentSelectedIndex].body;
          this.noteData = (label === 'New Note Created' ? '' : label) + '\n' +  (body === 'No additional Text Content' ? '' : body);
          break;
        }
      }

    })
    console.log(this.mnu);
  }

  keypressed() {
    if(this.subjectSevice.notes.length){
    this.subjectSevice.editedDate = new Date();
    this.subjectSevice.addNoteData(this.noteData);
    }
  }

  focus(){
    // this.txtarea.nativeElement.focus();
  }

}
