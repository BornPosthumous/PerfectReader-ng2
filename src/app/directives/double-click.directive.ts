import { Directive, HostListener, Inject, OnInit } from '@angular/core';
import { Subject } from "rxjs/Subject"
import 'rxjs/add/operator/debounceTime'

@Directive({
    selector: '[appDoubleClick]'
})
export class DoubleClickDirective implements OnInit {

    private clickStream = new Subject();

    constructor( @Inject('httpservice') private httpservice) { }

    @HostListener('click', ['$event'])
    onClick($event) {
        this.clickStream.next($event)
    }

    ngOnInit() {

        var doubleClickStream =
            this.clickStream.buffer(this.clickStream.debounceTime(350))
                .map((e) => e.length)
                .filter((len) => len === 2)

        doubleClickStream
            .subscribe(event => { console.log("dblclickevent") })

    }
}
