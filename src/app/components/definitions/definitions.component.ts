import {
    Component,
    OnInit,
    Inject,
    Input,
    Output,
    EventEmitter,
    HostListener
} from '@angular/core'
import { Store } from '@ngrx/store'
import { Subject } from 'rxjs/Subject'
import { Observable } from "rxjs/Observable"

import "rxjs/add/operator/last"
import "rxjs/add/operator/throttleTime"
import "rxjs/add/operator/map"
import "rxjs/add/operator/filter"
import "rxjs/add/operator/buffer"
import "rxjs/add/operator/debounce"

@Component({
    selector: 'app-definitions',
    templateUrl: './definitions.component.html',
    styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent implements OnInit {

    definitions: Observable<[any]>;

    constructor( @Inject('httpservice') private httpservice, private store: Store<any>) {
        this.definitions = this.store.select('definitions')
    }

    ngOnInit() {
    }
    getHistory() {

    }

}
