import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { SimpleFormComponent } from './simple-form/simple-form.component';

import { HttpService, MailService, ServicesModule } from './services/services.module';
import { WidgetModule } from './widgets/widget.module';

@NgModule({
    declarations: [
        AppComponent,
        SimpleFormComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        WidgetModule,
        ServicesModule.forRoot()
    ],
    providers: [
        { provide: 'mail', useClass: MailService },
        { provide: 'http', useClass: HttpService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
