import {
    Component, Directive, ViewChild, HostBinding,
    ViewContainerRef, HostListener, Inject,
    OnInit, Input, OnChanges, AfterContentInit,
    ComponentFactoryResolver
} from '@angular/core'

import { Http, Response, Headers, RequestOptions } from '@angular/http'


@Component({
    selector: 'app-paragraph-detail',
    templateUrl: './paragraph-detail.component.html',
    styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit, OnChanges {

    @Input() paragraph;
    parsed: string;
    @ViewChild('container', { read: ViewContainerRef }) container;

    constructor( @Inject('text') private text,
        private resolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    ngOnChanges(changes) {
        if (changes.paragraph.currentValue) {
            let _paragraph = changes.paragraph.currentValue.text;
            this.parsed = this.text.splitter(_paragraph);
        }
    }
    ngAfterContentInit() {
        console.log("afterContent", this.container);
    }
}
