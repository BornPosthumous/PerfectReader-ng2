import { Component, OnInit, OnChanges, Inject, Input } from '@angular/core';
import "rxjs/add/operator/last"
@Component({
    selector: 'app-definitions',
    templateUrl: './definitions.component.html',
    styleUrls: ['./definitions.component.css']
})
export class DefinitionsComponent implements OnInit, OnChanges {

    definitions: any;

    httpService: any;

    constructor( @Inject('httpservice') private httpservice) {
        this.httpService = httpservice;
        this.httpService.getDef().subscribe((e) => { this.definitions = e })
    }

    ngOnInit() { }
    getHistory() {
        console.log("Get history");
        this.httpService.getHistory()
    }
    ngOnChanges(changes) {
    }

}
