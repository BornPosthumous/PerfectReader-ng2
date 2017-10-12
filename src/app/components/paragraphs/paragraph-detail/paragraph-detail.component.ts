import {
    Component, Directive, ViewChild, HostBinding,
    ViewContainerRef, HostListener, Inject,
    OnInit, Input, AfterContentInit,
    ComponentFactoryResolver
} from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Store } from '@ngrx/store';
import { UPDATE_PARAGRAPH } from '../../../reducers/paragraphs.reducer'
import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/observable/of'
import 'rxjs/add/operator/debounceTime'
import 'rxjs/add/operator/bufferWhen'

@Component({
    selector: 'app-paragraph-detail',
    templateUrl: './paragraph-detail.component.html',
    styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit {

    @Input() paragraph;
    unparsed: string;
    textarea: any;
    id: number;
    isEditing: boolean;
    private obs = new Subject();
    public obs$ = this.obs.asObservable();

    @ViewChild('editP') editP;

    constructor(
        @Inject('text') private text,
        @Inject('httpservice') private httpService,
        @Inject('wikiservice') private wikiService,
        private resolver: ComponentFactoryResolver,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.paragraph.subscribe((x) => {
            if (x && x.paragraph && x.id) {
                this.id = x.id
                this.unparsed = x.paragraph;
            }
        })

        this.obs.bufferWhen(() =>
            this.obs.debounceTime(250))
            .map(list => list.length)
            .filter(length => length >= 2)
            .subscribe(totalClicks => {
                window.getSelection().empty()
                console.log("Total clicks : ${totalClicks}")
            })
    }

    save() {
        let obj = { id: this.id + '', paragraph: this.unparsed }
        console.log("Saving", obj)
        this.httpService.saveParagraph(obj).subscribe((x) => {
        })
    }

    selectText() {
        var sel;

        // Check for existence of window.getSelection() and that it has a
        // modify() method. IE 9 has both selection APIs but no modify() method.
        if (window.getSelection) {
            sel = window.getSelection();
            if (!sel.isCollapsed) {

                // Detect if selection is backwards
                var range = document.createRange();
                range.setStart(sel.anchorNode, sel.anchorOffset);
                range.setEnd(sel.focusNode, sel.focusOffset);
                var backwards = range.collapsed;
                range.detach();

                // modify() works on the focus of the selection
                var endNode = sel.focusNode, endOffset = sel.focusOffset;
                sel.collapse(sel.anchorNode, sel.anchorOffset);

                var direction = [];
                if (backwards) {
                    direction = ['backward', 'forward'];
                } else {
                    direction = ['forward', 'backward'];
                }

                sel.modify("move", direction[0], "character");
                sel.modify("move", direction[1], "word");
                sel.extend(endNode, endOffset);
                sel.modify("extend", direction[1], "character");
                sel.modify("extend", direction[0], "word");
                console.log("Sel : ", sel.toString())
                let word = sel.toString();
                this.httpService.lookupWord(word)
                this.wikiService.searchData(word).subscribe();
            }
        }
    }

}
