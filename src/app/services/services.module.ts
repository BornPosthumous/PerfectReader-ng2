import { NgModule } from "@angular/core";
import { HttpService } from './http/http.service'
import { TextService } from './text/text.service'
import { WikiService } from './wiki/wiki.service'
import { UploadService } from './file/upload.service'

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [
                HttpService,
                TextService,
                WikiService,
                UploadService
            ]
        }
    }
}

export {
    HttpService,
    TextService,
    WikiService,
    UploadService
}
