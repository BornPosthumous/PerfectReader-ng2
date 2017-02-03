import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { HttpService, MailService, ServicesModule, TextService } from './services/services.module';
import { ParagraphsModule } from './components/paragraphs.module';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule, // ngDep
        FormsModule, // ngDep
        HttpModule, // ngDep
        ParagraphsModule,
        ServicesModule.forRoot()
    ],
    providers: [
        { provide: 'http', useClass: HttpService },
        { provide: 'text', useClass: TextService }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
