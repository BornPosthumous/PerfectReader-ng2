import { NgModule } from "@angular/core";
import { HttpService } from "./http/http.service"
import { TextService } from "./text/text.service"

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [HttpService, TextService]
        }
    }
}

export {
    HttpService,
    TextService
}
