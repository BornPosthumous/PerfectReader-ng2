import { Component, OnInit, Inject, ViewChild } from '@angular/core'
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
  private ocr = new Subject();
  private mag = new Subject();
  private grey = new Subject();
  private enh = new Subject();
  private fil = new Subject();
  private off = new Subject();
  private unr = new Subject();
  private shp = new Subject();
  private trm = new Subject();
  private bor = new Subject();
  private thr = new Subject();
  public ocrResponse = '';

  public ocr$ = this.ocr.asObservable();
  public obs$ = this.obs.asObservable();
  public mag$ = this.mag.asObservable();
  public grey$ = this.grey.asObservable();
  public enh$ = this.enh.asObservable();
  public fil$ = this.fil.asObservable();
  public off$ = this.off.asObservable();
  public unr$ = this.unr.asObservable();
  public shp$ = this.shp.asObservable();
  public trm$ = this.trm.asObservable();
  public bor$ = this.bor.asObservable();
  public thr$ = this.thr.asObservable();

  private uploadID: Number;
  imgData: any;
  uploader: FileUploader = new FileUploader({
    url: URL,
    disableMultipart: false,
    // headers: [{
    //     name: '',
    //     value: ''
    // }]
  });
  options: any;
  greyChecked: boolean = false;
  @ViewChild('bookTitle') bookTitle;
  @ViewChild('ocrUrl') ocrUrl;
  @ViewChild('imgMagick') magickUrl;
  @ViewChild('greyscale') greyscale;
  @ViewChild('enhance') enhance;
  @ViewChild('filterSize') filterSize;
  @ViewChild('offset') offset;
  @ViewChild('unrotate') unrotate;
  @ViewChild('sharp') sharp;
  @ViewChild('trim') trim;
  @ViewChild('borderPad') borderPadding;
  @ViewChild('threshold') threshold;
  constructor(
    @Inject('httpservice') private http,
    @Inject('uploadservice') private uploadService,
    private store: Store<any>) {
    this.store.select('magickOptions')
      .map((x: any) => {
        console.log(x)
        this.options = x;
        return this.options
      }).subscribe()

  }
  onChange(e) {
    console.log("Checkbox clicked", e)
    if (e.target.name == 'greyscale') {
      console.log("Changing")
      this.greyChecked = !this.greyChecked;
    }
    // this.options = {
    //   greyscale: this.greyChecked,
    //   enhance: this.enhance.nativeElement.value,
    //   filterSize: this.filterSize.nativeElement.value,
    //   offset: this.offset.nativeElement.value,
    //   unrotate: this.unrotate.nativeElement.value,
    //   sharp: this.sharp.nativeElement.value,
    //   trim: this.trim.nativeElement.value,
    //   borderPadding: this.borderPadding.nativeElement.value,
    //   threshold: this.threshold.nativeElement.value
    // }
    // console.log("the options", this.options)
  }

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
    this.bor$.subscribe((x) => {
      console.log("Got ", x)
    })
    this.mag$.subscribe((x) => {
      if (this.magickUrl) {
        console.log("Magicking url", this.magickUrl)
        this.uploadService.magickImage(this.magickUrl.nativeElement.value, this.options).subscribe(x => {
          this.imgData = x._body;
        })
      }
    })
    this.ocr$.subscribe((x) => {
      this.uploadService
        .ocrImage(this.ocrUrl.nativeElement.value)
        .subscribe(x => { this.ocrResponse = x });
    })
    this.uploader.onBuildItemForm = (fileItem, form) => {
      console.log("Builfing forem", fileItem, form)
      console.log("Booktitle", this.bookTitle.nativeElement.value)
      let title = this.bookTitle.nativeElement.value;
      form.append('title', title);
      return { fileItem, form }
    };
  }
  changeBook() { }
};
