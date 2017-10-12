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
  SimpleChanges
} from '@angular/core';
import { Store } from '@ngrx/store'
const cheerio = require('cheerio')

export class OcrWordBaseComponent { }

@Component({
  selector: 'app-canvas-word',
  templateUrl: './canvas-word.component.html',
  styleUrls: ['./canvas-word.component.css']
})
export class CanvasWordComponent implements OnInit {
  @Input() wordData = [];
  @Input() selected: any;
  @ViewChild('canvas') canvas: ElementRef;
  @ViewChild('destCanvas') destCanvas: ElementRef;
  @ViewChild('img') img: ElementRef;

  private ctx: CanvasRenderingContext2D;
  private destCtx: CanvasRenderingContext2D;
  private element: HTMLImageElement;
  src: string;
  width: number;
  height: number;
  destWidth: number;
  destHeight: number;
  html: any;
  showCanvas: boolean = false;
  currentWord: any;
  currentLine: any;

  constructor(
    @Inject('httpservice') private http,
    @Inject('uploadservice') private uploadService,
    @Inject('ocrservice') private ocrService,
    private store: Store<any>,
    private compiler: ComponentFactoryResolver,
    canvas: ElementRef,
    img: ElementRef
  ) {
    console.log("Loaded canvas")
    this.src = 'http://localhost:8080/docs/public/temp.jpg';
  }

  ngOnInit() { }
  imgLoaded() {
    console.log("image loaded")
    this.ctx = this.canvas.nativeElement.getContext('2d');
    this.destCtx = this.destCanvas.nativeElement.getContext('2d');
    this.element = this.img.nativeElement;
    this.ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    this.destCtx.strokeStyle = 'rgba(255,255,255,0.5)';

    this.height = this.img.nativeElement.height;
    this.width = this.img.nativeElement.width;
    this.destHeight = this.img.nativeElement.height;
    this.destWidth = this.img.nativeElement.width;
    // this.height = 100;
    // this.width = 500;

    setTimeout(() => {
      this.ctx.drawImage(this.element, 0, 0, this.width, this.height);
      this.destCtx.drawImage(this.canvas.nativeElement, 0, 0)
    })
  }
  sliceImage(event) {
    let id: number = event.target.attributes.id.nodeValue;
    let p = this.wordData.filter(d => d.id == id)[0];
    this.drawBox(p, false);
  }
  lineChanged(changes) {
    if (changes.selected.previousValue &&
      changes.selected.previousValue.line) {
      return changes.selected.previousValue.line != changes.selected.currentValue.line
    } else { return true }
  }
  ngOnChanges(changes) {
    if (changes &&
      changes.selected &&
      changes.selected.currentValue
    ) {
      // if (this.lineChanged(changes)) {
      this.currentWord = changes.selected.currentValue.word;
      this.currentLine = changes.selected.currentValue.line;
      this.drawBox(changes.selected.currentValue.line, this.lineChanged(changes));
      // }
    }
  }
  wordInLineCoords(word, line) {

  }
  drawBox(elem, lineChanged) {
    if (!elem) return;
    this.showCanvas = true;
    let height = elem.title.bottomRight.y - elem.title.topLeft.y;
    let width = elem.title.bottomRight.x - elem.title.topLeft.x;
    this.destHeight = height * 0.4;
    this.destWidth = width * 0.4;
    this.clear();
    this.ctx.drawImage(this.element, 0, 0)

    this.drawWordBox(this.currentWord)
    this.ctx.drawImage(
      this.canvas.nativeElement,
      elem.title.topLeft.x,
      elem.title.topLeft.y,
      width,
      height,
      0,
      0,
      width,
      height
    );
    setTimeout(() => {
      this.destCtx.scale(0.4, 0.4);
      this.destCtx.drawImage(this.canvas.nativeElement, 0, 0);
      this.destCtx.setTransform(1, 0, 0, 1, 0, 0);
    })
  }
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.destCtx.clearRect(0, 0, this.width, this.height);
  }
  render() {
  }
  drawWordBox(word) {
    let wHeight = word.title.bottomRight.y - word.title.topLeft.y;
    let wWidth = word.title.bottomRight.x - word.title.topLeft.x;
    this.ctx.strokeRect(word.title.topLeft.x, word.title.topLeft.y, wWidth, wHeight);
  }
  drawWordBoxes() {
    // this.ctx.fillStyle = 'rgba(255,255,255,0.5)';
    if (this.wordData) {
      this.wordData.forEach(d => {
        let height = d.title.bottomRight.y - d.title.topLeft.y;
        let width = d.title.bottomRight.x - d.title.topLeft.x;
        this.ctx.drawImage(
          this.element,
          d.title.topLeft.x,
          d.title.topLeft.y,
          width,
          height,
          d.title.topLeft.x,
          d.title.topLeft.y,
          width,
          height
        )
        // this.ctx.strokeRect(d.title.topLeft.x, d.title.topLeft.y, width, height);
      })
    }
  }
}
