import { Component, OnInit, Pipe, Inject } from '@angular/core';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/reduce'

import { Subject } from "rxjs/Subject"

@Component({
    selector: 'app-paragraphs',
    templateUrl: './paragraphs.component.html',
    styleUrls: ['./paragraphs.component.css']
})


export class ParagraphsComponent implements OnInit {

    items = new Subject();
    paragraphs = [];

    constructor( @Inject('http') private http) { }

    ngOnInit() {
        this.items = this.http.getParagraphs()
            .flatMap((item) => item)
            .map((e) => { return e.paragraph })
            .reduce((acc, cur) => ([...acc, cur]), [])
            .subscribe((x) => { this.paragraphs = x })
    }

}
