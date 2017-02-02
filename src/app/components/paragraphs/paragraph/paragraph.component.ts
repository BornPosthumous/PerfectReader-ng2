import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-paragraph',
    templateUrl: './paragraph.component.html',
    styleUrls: ['./paragraph.component.css']
})
export class ParagraphComponent implements OnInit {

    @Input() paragraph;
    @Output() update = new EventEmitter();
    selected = false;

    constructor() { }

    ngOnInit() { }

    select(e) {
        this.update.emit({ id: this.paragraph.id })
        console.log(this.selected)
    }

}
