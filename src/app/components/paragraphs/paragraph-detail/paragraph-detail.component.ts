import {
    Component, Directive, ViewChild, HostBinding,
    ViewContainerRef, HostListener, Inject,
    OnInit, Input, AfterContentInit,
    ComponentFactoryResolver
} from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Store } from '@ngrx/store';
import { UPDATE_PARAGRAPH } from '../../../reducers/paragraphs.reducer'

@Component({
    selector: 'app-paragraph-detail',
    templateUrl: './paragraph-detail.component.html',
    styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit {

    @Input() paragraph;
    parsed: string;
    unparsed: string;
    textarea: any;
    show: boolean;
    id: number;
    isEditing: boolean;

    @ViewChild('para') para;
    @ViewChild('editP') editP;
    constructor(
        @Inject('text') private text,
        @Inject('httpservice') private httpService,
        @Inject('wikiservice') private wikiService,
        private resolver: ComponentFactoryResolver,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.show = false
        this.paragraph.subscribe((x) => {
            if (x && x.paragraph && x.id) {
                this.id = x.id
                this.unparsed = x.paragraph;
                this.parsed = this.text.splitter(this.unparsed);
                if (this.para && this.para.nativeElement) {
                    this.para.nativeElement.value = this.unparsed;
                }
            }
        })
    }
    save() {
        //TODO: Should use destructuring. Route this through the store.
        console.log(this.para)
        let update = this.para.nativeElement.value
        let obj = { id: this.id + '', paragraph: update }
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

    edit() {
        this.show = !this.show
        this.isEditing = !this.isEditing

        this.editP.nativeElement.contentEditable = this.isEditing;
        if (this.para && this.para.nativeElement) {
            let update = this.para.nativeElement.value
            this.unparsed = update;

        }
    }

}
