
import {
  Injectable,
  OnInit,
  Inject,
} from '@angular/core'
import {
  Http,
  Response,
  Headers,
  RequestOptions
} from '@angular/http'
import { Observable } from 'rxjs/Rx'
import { BehaviorSubject } from "rxjs/BehaviorSubject"
import { ReplaySubject } from "rxjs/ReplaySubject"
import { Subject } from "rxjs/Subject"

import 'rxjs/add/operator/map'
import 'rxjs/add/operator/last'
import 'rxjs/add/operator/take'
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/concatMap'
import 'rxjs/add/operator/concat'
import 'rxjs/add/operator/merge'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/reduce'
import 'rxjs/add/operator/scan'
import 'rxjs/add/operator/skip'
import 'rxjs/add/operator/scan'
import { Store } from '@ngrx/store';
import { ADD_DEF } from '../../reducers/definitions.reducer'
import * as R from 'ramda'


@Injectable()
export class UploadService {

  private api = 'http://localhost:8080/api/';

  constructor(private http: Http, private store: Store<any>) { }

  ngOnInit() { }

  ocrImage(url) {
    let filename = 'file';
    let bodyString = JSON.stringify({ filename, url });
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })

    return this.http.post(this.api + `texts/ocrurl`, bodyString, options)
      .map((res) => res.json());
  }
  magickImage(url, magickOptions) {
    let filename = 'file';
    let bodyString = JSON.stringify({ filename, url, magickOptions });
    let headers = new Headers({ 'Content-Type': 'application/json' })
    let options = new RequestOptions({ headers: headers })
    console.log("Sending Magick")
    return this.http.post(this.api + `texts/magick`, bodyString, options)
      .map((res) => { console.log("Magick response", res); return res });
  }
  testXML() {
    let bodyString = JSON.stringify({});
    let headers = new Headers({ 'Content-Type': 'text/html' })
    let options = new RequestOptions({ headers: headers })

    return this.http.post(this.api + `texts/ocrtest`, bodyString, options)
      .map((res) => res.json());
  }
}
