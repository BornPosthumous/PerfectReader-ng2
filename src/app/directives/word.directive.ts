import { Directive, Inject, HostListener } from '@angular/core';

@Directive({
    selector: '[lookupWord]'
})

export class WordDirective {
    constructor(
        @Inject('httpservice') private httpService,
        @Inject('wikiservice') private wikiService
    ) { }

    @HostListener('click', ['$event'])
    onClick($event) {
        let word = $event.srcElement.innerHTML.trim()
        this.httpService.lookupWord(word)
        this.wikiService.searchData(word).subscribe();
    }
}
