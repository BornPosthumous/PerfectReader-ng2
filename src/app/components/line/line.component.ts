import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.css']
})
export class LineComponent implements OnInit {
  @Input() line: any;
  @Output() selectedLine: EventEmitter<any> = new EventEmitter<any>();
  @Output() selectedWord: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit() {
  }
  ngOnChanges(changes) { }

  selectLine(event) {
    if (event.target && event.target.attributes && event.target.attributes.id) {
      console.log(event)
      this.selectedLine.emit(event.target.attributes.id.nodeValue);
    }
  }
  selectWord(event) {
    this.selectedWord.emit(event)
  }
}
