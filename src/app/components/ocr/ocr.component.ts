import {
  Component,
  OnInit,
  Inject,
  ViewEncapsulation,
  ComponentRef,
  ComponentFactoryResolver,
  ViewChild,
  ViewContainerRef,
  Input,
  Injectable,
  Directive,
  ElementRef,
} from '@angular/core';
import { Store } from '@ngrx/store'
const cheerio = require('cheerio')
import { CanvasWordComponent } from "../canvas-word/canvas-word.component"
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-ocr',
  templateUrl: './ocr.component.html',
  styleUrls: ['./ocr.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OcrComponent implements OnInit {
  @Input() value: string;
  @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
  currentWord: any;

  constructor(
    private store: Store<any>,
    @Inject('ocrservice') private ocrService,
  ) { }
  ngOnInit() { }
  changeCanvas(event) {
    console.log("Change Canvas", event)
    this.currentWord = event
  }

}
export interface TileModel {
  data: any;
}
@Component({
  selector: 'dashboard-imagetextwidget',
  template: `<div>{{data.someText}}</div>`
})

export class ImageTextWidgetComponent implements OnInit {
  @Input() data: any;
  constructor() {
    console.log("Constructed imagetextwidgetcomponent")
  }

  ngOnInit() { }
}

@Injectable()
export class WidgetComponentService {
  getComponent(componentName: string) {
    if (componentName === "ImageTextWidgetComponent") {
      return ImageTextWidgetComponent
    }
  }
}

@Directive({
  selector: '[widget-host]',
})
export class DashboardTileWidgetHostDirective {
  constructor(public viewContainerRef: ViewContainerRef) {
    console.log("Constructing widget host")
  }
}
@Component({
  selector: 'dashboard-tile',
  template: `  <div class="col-md-2 col-lg-2 col-sm-2 col-default-margin col-default">
                <template widget-host></template>
  </div>
`
})

export class DashboardTileComponent implements OnInit {
  @Input() tile: any;
  @ViewChild(DashboardTileWidgetHostDirective) widgetHost: DashboardTileWidgetHostDirective;
  constructor(
    private _componentFactoryResolver: ComponentFactoryResolver,
    private widgetComponentService: WidgetComponentService
  ) { }

  ngOnInit() {
    this.renderComponents();
  }
  ngAfterViewInit() {

  }
  renderComponents() {
    console.log("This tile", this.tile)
    let component: any = this.widgetComponentService.getComponent(this.tile.componentName);
    let componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
    let viewContainerRef = this.widgetHost.viewContainerRef;
    viewContainerRef.clear();
    let componentRef = viewContainerRef.createComponent(componentFactory);
    (<TileModel>componentRef.instance).data = this.tile;
  }
}

@Component({
  selector: 'dashboard-group',
  template: `
<div class="row">
<dashboard-tile *ngFor="let tile of tiles" [tile]="tile"></dashboard-tile>
</div>`
})

export class DashboardGroupComponent implements OnInit {
  constructor() { }
  var: any = true;
  tiles: any;
  ngOnInit() {
    console.log("Rendering tiles")
    this.tiles = [
      {
        templateName: "ImageTemplate1",
        componentName: "ImageTextWidgetComponent",
        someText: "Some dynamic text"
      },
    ];
  }
}

  // @Input() tile: any;
  // @ViewChild(DashboardTileWidgetHostDirective) widgetHost: DashboardTileWidgetHostDirective;
  // constructor(
  //   private _componentFactoryResolver: ComponentFactoryResolver,
  //   private widgetComponentService: WidgetComponentService
  // ) {
  //   console.log("Init ocr componnet")
  // }

  // ngOnInit() {
  // }
  // ngAfterViewInit() {
  //   console.log("After view init")
  //   // this.renderComponents();
  // }
  // renderComponents() {
  //   let component = this.widgetComponentService.getComponent(this.tile.componentName);
  //   console.log("Component", component)
  //   let componentFactory = this._componentFactoryResolver.resolveComponentFactory(component);
  //   console.log("Component factory", componentFactory)
  //   console.log("Widgy", this.widgetHost)
  //   let viewContainerRef = this.widgetHost.viewContainerRef;
  //   let componentRef = viewContainerRef.createComponent(componentFactory);
  //   (<TileModel>componentRef.instance).data = this.tile;

  // }
//}
