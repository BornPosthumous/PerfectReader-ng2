import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-ocr-word',
  templateUrl: './ocr-word.component.html',
  styleUrls: ['./ocr-word.component.css']
})
export class OcrWordComponent implements OnInit {
  @Input() word: any;
  @Output() selectedWord: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() { }

  selectWord(event) {
    this.selectedWord.emit(event.target);
  }
}
