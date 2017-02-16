import { Injectable } from '@angular/core'
import * as _ from 'ramda'
const VerEx = require('verbal-expressions');

@Injectable()
export class TextService {

    constructor() {
        console.log("Text Service works");
    }
    // punctuationParser(paragraph) {
    //     let split =
    //         this.splitter(paragraph)
    //             .map((e) => (/^[a-zA-Z0-9_]*$/.test(e)) ? { isWord: true, word: e } : { isWord: false, word: e })
    //     console.log("Pee", split);
    //     return split
    // }

    splitter(paragraph) {
        //Amazingly more efficient way to do below + punctuationParser? or deceptive farse
        return paragraph.split(/\b/g).map((w) => ({ isWord: (/\w/.test(w)), word: w }));

        // return paragraph
        //     // Split on white space
        //     .split(/\s/g)

        //     //Replaces a carriage return (/r or /r/n ) with a space
        //     //and splits each into array
        //     .map((s) => s.replace(/\r?\n|\r/g, " ").split(" "))

        //     // flatten array
        //     .reduce((acc, cur) => acc.concat(cur), [])

        //     // put white space around non alphanumeric chars and split
        //     .map((p) => p.replace(/[^a-zA-Z0-9 :]/g,
        //         (a) => ' ' + a + ' ')
        //         .split(" "))

        //     // Flatten array again
        //     .reduce((acc, cur) => acc.concat(cur), [])

        //     //filter out empty elements
        //     .filter((x) => x !== "")

    }

}
