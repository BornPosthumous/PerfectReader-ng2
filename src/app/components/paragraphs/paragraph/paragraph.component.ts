import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-paragraph',
    templateUrl: './paragraph.component.html',
    styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {

    @Input() paragraph;
    @Output() selection = new EventEmitter();

    constructor() { }

    ngOnInit() { }

    makeSelection(e) {
        this.selection.emit({ id: this.paragraph.id })
    }

}
