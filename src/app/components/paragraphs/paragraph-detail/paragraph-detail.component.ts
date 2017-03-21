import {
    Component, Directive, ViewChild, HostBinding,
    ViewContainerRef, HostListener, Inject,
    OnInit, Input, AfterContentInit,
    ComponentFactoryResolver
} from '@angular/core'
import { Http, Response, Headers, RequestOptions } from '@angular/http'
import { Store } from '@ngrx/store';


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

    @ViewChild('para') para;

    constructor(
        @Inject('text') private text,
        @Inject('httpservice') private httpService,
        private resolver: ComponentFactoryResolver,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.show = false
        this.paragraph.subscribe((x) => {
            if (x && x.text && x.id) {
                this.id = x.id
                this.unparsed = x.text;
                this.parsed = this.text.splitter(this.unparsed);
                if (this.para && this.para.nativeElement) {
                    this.para.nativeElement.value = this.unparsed;
                }
            }
        })
    }

    save() {
        //TODO: Should use destructuring
        let update = this.para.nativeElement.value
        let obj = { id: this.id + '', paragraph: update }
        this.httpService.saveParagraph(obj).subscribe()

        this.edit()
    }

    edit() {
        this.show = !this.show
    }
}
