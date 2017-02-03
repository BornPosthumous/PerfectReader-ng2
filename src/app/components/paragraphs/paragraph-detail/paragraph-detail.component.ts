import { Component, Inject, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-paragraph-detail',
    templateUrl: './paragraph-detail.component.html',
    styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit, OnChanges {

    @Input() paragraph;
    parsed: string;

    constructor( @Inject('text') private text) {
    }

    ngOnInit() {
        console.log(this.text);
    }

    ngOnChanges(changes) {
        if (changes.paragraph.currentValue) {
            let _paragraph = changes.paragraph.currentValue.text;
            this.parsed = this.text.splitter(_paragraph);
        }
    }
}
