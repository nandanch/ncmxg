import { NgModule } from '@angular/core';
import { NcmxgraphComponent } from './ncmxgraph.component';
import { NcmxgDirective } from './ncmxg.directive';
import { NcmxmenuComponent } from './ncmxgraph/ncmxmenu/ncmxmenu.component';



@NgModule({
  declarations: [NcmxgraphComponent, NcmxgDirective, NcmxmenuComponent],
  imports: [
  ],
  exports: [NcmxgraphComponent,NcmxmenuComponent]
})
export class NcmxgraphModule { }
