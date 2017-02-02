import { Injectable } from '@angular/core';

@Injectable()
export class MailService {
    messages = [
        { id: 0, text: 'hello world' },
        { id: 1, text: 'i love u' },
        { id: 2, text: 'hello jeff' }
    ]
    constructor() { }

    update(id, text) {
        this.messages = this.messages
            .map(m => m.id === id ? { id, text } : m)
        console.log(this.messages)
    }
}
