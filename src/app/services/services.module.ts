import { NgModule } from "@angular/core";
import { HttpService } from './http/http.service'
import { TextService } from './text/text.service'
import { WikiService } from './wiki/wiki.service'
import { UploadService } from './file/upload.service'
import { WidgetComponentService } from '../components/ocr/ocr.component'
import { OcrService } from './ocr/ocr.service'

@NgModule({})
export class ServicesModule {
  static forRoot() {
    return {
      ngModule: ServicesModule,
      providers: [
        HttpService,
        TextService,
        WikiService,
        UploadService,
        WidgetComponentService,
        OcrService
      ]
    }
  }
}

export {
  HttpService,
  TextService,
  WikiService,
  UploadService,
  OcrService
}
