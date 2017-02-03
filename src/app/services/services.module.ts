import { NgModule } from "@angular/core";
import { MailService } from "./mail/mail.service"
import { HttpService } from "./http/http.service"
import { TextService } from "./text/text.service"

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [MailService, HttpService, TextService]
        }
    }
}

export {
    MailService,
    HttpService,
    TextService
}
