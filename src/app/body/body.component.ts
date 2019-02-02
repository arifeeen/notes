import { Component, OnInit, Renderer2, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { SubjectserviceService } from '../services/subjectservice.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css']
})
export class BodyComponent implements OnInit, AfterViewInit {
  today: number = Date.now();
  noteData: string = ''
  @ViewChild("menu", { read: ElementRef }) private mnu: ElementRef;

  constructor(private renderer: Renderer2, private subjectSevice: SubjectserviceService) {

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
  }

  keypressed() {
    this.subjectSevice.addNoteData(this.noteData);
  }

}
