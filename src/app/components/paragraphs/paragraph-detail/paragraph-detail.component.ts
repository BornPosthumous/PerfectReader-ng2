import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-paragraph-detail',
    templateUrl: './paragraph-detail.component.html',
    styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit {

    @Input() paragraph;
    constructor() { }

    ngOnInit() {
    }

}
