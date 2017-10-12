import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject
} from '@angular/core';

@Component({
  selector: 'app-ocr-paragraph',
  templateUrl: './ocr-paragraph.component.html',
  styleUrls: ['./ocr-paragraph.component.css']
})
export class OcrParagraphComponent implements OnInit {
  @Input() wordData: any;
  @Output() lineAndWord: EventEmitter<any> = new EventEmitter<any>();
  lines: any;
  currentLine: any;
  currentWord: any;

  constructor(
    @Inject('ocrservice') private ocrService
  ) { }

  ngOnInit() {
    this.ocrService.getXmlAndReturnLineData().subscribe(lines => {
      this.lines = lines
    })
  }
  lineSelected(id) {
    this.currentLine = this.lines.filter(d => d.id == id)[0];
  }
  wordSelected(_word) {
    let lineId = _word.attributes.lineId.nodeValue
    this.currentLine = this.lines.filter(line => {
      return line.id == lineId
    })[0];
    this.currentWord = this.currentLine.wordsInLine.filter(word => word.id == _word.id)[0]
    this.emitLineAndWord();
  }
  emitLineAndWord() {
    this.lineAndWord.emit({
      line: this.currentLine,
      word: this.currentWord
    })
  }
}
