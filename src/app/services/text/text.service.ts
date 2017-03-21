import { Injectable } from '@angular/core'
import * as _ from 'ramda'
const VerEx = require('verbal-expressions');

@Injectable()
export class TextService {

    constructor() { }

    splitter(paragraph) {
        return paragraph.split(/\b/g).map((w) => ({ isWord: (/\w/.test(w)), word: w }));
    }
}
