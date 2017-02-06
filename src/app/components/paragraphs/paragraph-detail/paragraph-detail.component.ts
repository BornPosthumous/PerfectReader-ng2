import { Component, Directive, HostBinding, HostListener, Inject, OnInit, Input, OnChanges } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

@Directive({
    selector: '[hoverWord]'
})
export class WordDirective {
    @HostListener('click', ['$event'])
    onClick($event) {
        let word = $event.srcElement.innerHTML.replace(/\W/g, '')
        this.httpservice.getDefinition(word)
    }
    constructor( @Inject('httpservice') private httpservice) { }
}

@Component({
    selector: 'app-paragraph-detail',
    templateUrl: './paragraph-detail.component.html',
    styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit, OnChanges {

    @Input() paragraph;
    parsed: string;

    constructor( @Inject('text') private text) { }

    ngOnInit() { }

    ngOnChanges(changes) {
        if (changes.paragraph.currentValue) {
            let _paragraph = changes.paragraph.currentValue.text;
            this.parsed = this.text.splitter(_paragraph);
        }
    }
}
