import { Component, OnInit, OnChanges, Inject, Input } from '@angular/core';
import "rxjs/add/operator/last"
@Component({
    selector: 'app-definitions',
    templateUrl: './definitions.component.html',
    styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent implements OnInit, OnChanges {

    definitions: any;
    history: any;
    httpService: any;

    constructor( @Inject('httpservice') private httpservice) {
        this.httpService = httpservice;
        this.httpService.getDef().subscribe((e) => { this.definitions = e })
    }

    ngOnInit() { }
    getHistory() {
        this.httpService.getHistory()
            .subscribe((e) => { this.history = e.map((s) => { console.log(s); return s }) })
    }
    ngOnChanges(changes) {
        console.log(changes);
    }

}
