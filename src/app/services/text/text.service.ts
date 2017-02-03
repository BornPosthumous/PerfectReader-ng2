import { Injectable } from '@angular/core';

@Injectable()
export class TextService {

    constructor() {
        console.log("Text Service works");
    }

    splitter(paragraph) {
        return paragraph.split(" ")
    }

}
