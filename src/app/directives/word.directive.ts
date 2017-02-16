import { Directive, Inject, HostListener } from '@angular/core';

@Directive({
    selector: '[lookupWord]'
})

export class WordDirective {
    constructor( @Inject('httpservice') private httpservice) {
    }
    @HostListener('click', ['$event'])
    onClick($event) {
        let word = $event.srcElement.innerHTML.trim()
        this.httpservice.lookupWord(word)
    }

}
