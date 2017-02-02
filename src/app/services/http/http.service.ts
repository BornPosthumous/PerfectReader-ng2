import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/take';

@Injectable()
export class HttpService {

    private api = 'http://localhost:8080/api/';
    private headers = new Headers({ "Access-Control-Allow-Origin": '*' })
    //    private bodyString = JSON.stringify(body);
    private options = new RequestOptions({ headers: this.headers })

    constructor(private http: Http) {
        console.log("HTTP Service", this.http)
    }

    getParagraphs() {
        return this.http.get(this.api + 'paragraphs')
            .map((res: Response) => res.json())
    }
}
