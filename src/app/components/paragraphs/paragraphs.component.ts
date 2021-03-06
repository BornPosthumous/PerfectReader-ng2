import { Component, OnInit, Pipe, Inject, HostListener } from '@angular/core';
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/reduce'

import { Observable } from "rxjs/Observable"

import { Subject } from "rxjs/Subject"
import { Store } from '@ngrx/store';

import { NEW_BOOK, NEW_PARAGRAPH, CURRENT_PARAGRAPH } from '../../reducers/current.reducer'


@Component({
    selector: 'app-paragraphs',
    templateUrl: './paragraphs.component.html',
    styleUrls: ['./paragraphs.component.css'],

})


export class ParagraphsComponent implements OnInit {

    items = new Subject();
    paragraphs;
    paragraph;
    books;
    current: Observable<any>;
    index: number;
    isHidden: boolean;
    isHovered: boolean;
    selectedBook;

    constructor(
        @Inject('httpservice') private http,
        private store: Store<any>
    ) { }

    ngOnInit() {
        this.index = 0;
        this.isHidden = false;

        // this.paragraphs = this.store.select('paragraphs')
        //     .map((x) => {
        //         return x
        //     }).subscribe()

        this.paragraph = this.store.select('current')
            .map((x: any) => {
                if (x.currentParagraph) {
                    return x.currentParagraph
                } else { return {} }
            })

        this.books = this.store.select('books')
        this.items.subscribe((x) => {
            this.isHovered = true;
            this.selectedBook = x;
        })
    }

    deleteBook(e, b) {
        console.log("E,B", e, b)
        this.http.deleteBook(b.id)
    }
    onClick(e, f) {
        this.http.getParagraphs(f.id).subscribe();
        this.items.next(f)
    }

    next(delta) {
        this.index += delta;
        this.http.changeParagraph(this.index)
    }

    //TODO Make observables from these
    @HostListener('window:keypress', ['$event'])
    keyboardInput(event: KeyboardEvent) {
        let key = event.key
        if (key == 'n') {
            this.next(1)
        }
        if (key == 'p') {
            this.next(-1)
        }
        if (key == 's') {
            this.isHidden = !this.isHidden
        }
    }
}
