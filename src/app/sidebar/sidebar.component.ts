import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private renderer: Renderer2) { }

  @ViewChild('sbar', {read: ElementRef}) private sbar:ElementRef; 

  ngOnInit() {
  }

  openNav(){
    this.renderer.setStyle(this.sbar['nativeElement'],'width','250px');

  }

  closeNav(){
    this.renderer.setStyle(this.sbar['nativeElement'],'width',0);
  }

}
