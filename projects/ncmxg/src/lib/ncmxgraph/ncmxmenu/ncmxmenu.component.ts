import { Component, OnInit, Renderer2, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nc-mxgraph-menu',
  templateUrl: './ncmxmenu.component.html',
  styleUrls: ['./ncmxmenu.component.css', '../../styles/dropdown.css']
})
export class NcmxmenuComponent implements OnInit {
  public menuStateOpened:EventEmitter<any> = new EventEmitter();
  private menuDisplayed:any = false;
  private outsideClickListener:any = undefined;
  private prevStateOpen:boolean = false;
  @Output() itemId: EventEmitter<string> = new EventEmitter();

  public setMenuDisplayed(value:boolean){
    this.menuDisplayed = value;
  }

  public getMenuDisplayed(){
    return this.menuDisplayed;
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(){
    this.menuStateOpened.subscribe((item:any) => {
      this.setMenuDisplayed(item.state);
      if(item.state){
        this.renderer.addClass(this.el.nativeElement.firstChild, 'menudiv');        
        this.itemId.emit(item.id);
        setTimeout(() => {
          this.setUpExternalClickListener();
        });
      } else {
        this.renderer.removeClass(this.el.nativeElement.firstChild, 'menudiv');    
        this.disengageExternalClickListener(); 
      }
      setTimeout(() => this.prevStateOpen = item.state);
   });
  }

  private disengageExternalClickListener() {
    if (this.outsideClickListener != undefined) {
      this.outsideClickListener();
    }
  }

  private setUpExternalClickListener() {
    if (this.prevStateOpen) {
      this.disengageExternalClickListener();
      this.prevStateOpen = false;
    }
    else {
      this.outsideClickListener = this.renderer.listen('document', 'click', (event) => {
        this.renderer.removeClass(this.el.nativeElement.firstChild, 'menudiv');
        this.setMenuDisplayed(false);
        this.outsideClickListener();
        setTimeout(() => {
          this.menuStateOpened.emit({"id": null,"state":false});
        });
      });
    }
  }
}
