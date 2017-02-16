import { Component, OnInit, Input, Inject, OnChanges } from '@angular/core';

@Component({
    selector: 'app-wikipage',
    templateUrl: './wikipage.component.html',
    styleUrls: ['./wikipage.component.css']
})
export class WikipageComponent implements OnInit {
    @Input() wikiPage;
    html;

    constructor( @Inject('wikiservice') private wikiService) {

    }

    ngOnInit() {
    }
    ngOnChanges(changes) {
        if (changes.wikiPage.currentValue) {
            let _term = changes.wikiPage.currentValue;
            this.wikiService.search2(_term)
                .subscribe((e) => { this.html = e })
        }
    }

}
