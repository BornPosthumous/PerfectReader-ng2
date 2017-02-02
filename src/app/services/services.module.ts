import { NgModule } from "@angular/core";
import { MailService } from "./mail/mail.service"
import { HttpService } from "./http/http.service"

@NgModule({})
export class ServicesModule {
    static forRoot() {
        return {
            ngModule: ServicesModule,
            providers: [MailService, HttpService]
        }
    }
}

export {
    MailService,
    HttpService
}
