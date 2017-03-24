import { Component, OnInit, Inject } from '@angular/core'
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload'
import { Store } from '@ngrx/store'
import { NEW_BOOK } from '../../../reducers/current.reducer'
import { HostListener } from '@angular/core'
import { Subject } from 'rxjs'

const URL = 'http://localhost:8080/api/texts/multipart'

@Component({
    selector: 'app-upload',
    templateUrl: './upload.component.html',
    styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
    private obs = new Subject();
    public obs$ = this.obs.asObservable();

    private uploadID: Number;
    uploader: FileUploader = new FileUploader({
        url: URL,
        disableMultipart: false,
        // headers: [{
        //     name: '',
        //     value: ''
        // ]}
    });

    constructor(
        @Inject('httpservice') private http,
        private store: Store<any>) { }


    ngOnInit() {
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            let res = JSON.parse(response);
            this.uploadID = res.id
        }

        this.obs$.subscribe((x) => {
            if (this.uploadID) {
                this.http.getParagraphs(this.uploadID).subscribe()
            }
        })
    }
    changeBook() { }
}
