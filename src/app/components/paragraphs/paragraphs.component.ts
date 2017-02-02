import { Component, OnInit, Input, Pipe } from '@angular/core';

@Component({
    selector: 'app-paragraphs',
    templateUrl: './paragraphs.component.html',
    styleUrls: ['./paragraphs.component.css']
})
export class ParagraphsComponent implements OnInit {

    @Input() paragraphs;

    constructor() { }

    ngOnInit() { }

}
