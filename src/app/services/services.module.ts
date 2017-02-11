import { NgModule } from "@angular/core";
import { HttpService } from './http/http.service'
import { TextService } from './text/text.service'
import { WikiService } from './wiki/wiki.service'

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [HttpService, TextService, WikiService]
        }
    }
}

export {
    HttpService,
    TextService,
    WikiService,
}
