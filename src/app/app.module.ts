import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
//import { SimpleFormComponent } from './simple-form/simple-form.component';

import { HttpService, MailService, ServicesModule } from './services/services.module';
import { ParagraphsModule } from './components/paragraphs.module';

@NgModule({
    declarations: [
        AppComponent,
        // SimpleFormComponent,1
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        ParagraphsModule,
        ServicesModule.forRoot()
    ],
    providers: [
        { provide: 'http', useClass: HttpService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
