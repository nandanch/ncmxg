import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, Renderer2, HostListener, ElementRef, ContentChild } from '@angular/core';
import { NcmxgDirective } from './ncmxg.directive';
import { NcmxmenuComponent } from './ncmxgraph/ncmxmenu/ncmxmenu.component';

@Component({
  selector: 'nc-mxgraph',
  template: `
    <div ncmxGraphlib [gdata]="mxdata" [gwidth]="containerWidth" style="position:absolute;padding-right:30px;"></div>
    <ng-content></ng-content>
  `,
  styles: [':host /deep/ svg { margin-right: 15px; }', `:host /deep/ .noselect {
    -webkit-touch-callout: none; /* iOS Safari */
      -webkit-user-select: none; /* Safari */
       -khtml-user-select: none; /* Konqueror HTML */
         -moz-user-select: none; /* Old versions of Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
              user-select: none; /* Non-prefixed version, currently
                                    supported by Chrome, Opera and Firefox */
  }`]
})
export class NcmxgraphComponent implements OnInit, AfterViewInit {
  private nodeMenuClicked: EventEmitter<any>;
  private preRead: any;
  private lastVerticeClicked: any;
  private menuXPos: number;
  public mxdata: Array<any>;
  public containerWidth: number;
  
  @Input() graphData: Array<any>;
  @Output() onVertexClick: EventEmitter<any> = new EventEmitter();

  @ContentChild(NcmxmenuComponent, { read: ElementRef })
  menuComponent: ElementRef;

  @ContentChild(NcmxmenuComponent, { read: NcmxmenuComponent })
  childMenu: NcmxmenuComponent;

  @ViewChild(NcmxgDirective)
  set ncmxDirective(directive: NcmxgDirective) {
    this.nodeMenuClicked = directive.onNodeMenuClicked;
  }
  
  @HostListener('scroll')
  onContainerScroll(): void {
    if(this.childMenu.getMenuDisplayed()){
      this.hideMenu();
    }
  }


  @HostListener("window:scroll", ["$event"])
  onScroll(event): void {
    /* if (this.menuXPos !== undefined) {
      const delta = this.preRead - this.el.nativeElement.scrollLeft;
      const offsetX = this.menuXPos + delta;
      this.lastVerticeClicked.x = offsetX;
      this.onVertexClick.emit(this.lastVerticeClicked);
      this.controlMenuPosition(this.lastVerticeClicked);
    } */
    if(this.childMenu.getMenuDisplayed()){
      this.hideMenu();
    }
  }

  constructor(private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit() {
    this.containerWidth = this.el.nativeElement.offsetWidth - 60;
    this.mxdata = this.graphData;
    console.log("container width: ", this.el.nativeElement.offsetWidth);
  }

  ngAfterViewInit(): void {
    this.nodeMenuClicked.subscribe(value => {
      this.lastVerticeClicked = value;
      this.menuXPos = value.x;
      this.preRead = this.el.nativeElement.scrollLeft;
      this.onVertexClick.emit(value);
      //this.childMenu.setMenuDisplayed(true);
      //this.renderer.addClass(this.menuComponent.nativeElement.firstChild, 'menudiv');
      this.childMenu.menuStateOpened.emit({"id": value.id,"state":true}); 
      this.controlMenuPosition(value);
    });
  }

  hideMenu(){
    this.childMenu.menuStateOpened.emit({"id": null,"state":false});    
  }

  controlMenuPosition(value: any) {
    this.renderer.setStyle(this.menuComponent.nativeElement.firstChild, 'left', value.x + 'px');
    this.renderer.setStyle(this.menuComponent.nativeElement.firstChild, 'top', value.y + 'px');
  }

  ngOnDestroy(){
    this.nodeMenuClicked.unsubscribe();
    this.onVertexClick.unsubscribe();
  }
}
