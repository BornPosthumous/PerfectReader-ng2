import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AppComponent } from './app.component';

import {
    HttpService,
    ServicesModule,
    TextService,
    WikiService,
    UploadService
} from './services/services.module';
import { ParagraphsModule } from './components/paragraphs.module';
import { WordDirective } from './directives/word.directive';
import { StoreModule } from '@ngrx/store'
import { definitions } from './reducers/definitions.reducer'
import { paragraphs } from './reducers/paragraphs.reducer'
import { current } from './reducers/current.reducer'
import { books } from './reducers/books.reducer'
import { Store } from '@ngrx/store'

@NgModule({
    imports: [
        BrowserModule, // ngDep
        FormsModule, // ngDep
        HttpModule, // ngDep
        JsonpModule, //ngDep
        StoreModule.provideStore({ definitions, paragraphs, current, books }),
        ParagraphsModule,
        ServicesModule.forRoot(),
    ],
    declarations: [
        AppComponent,
    ],
    exports: [],
    providers: [
        { provide: 'httpservice', useClass: HttpService },
        { provide: 'text', useClass: TextService },
        { provide: 'wikiservice', useClass: WikiService },
        { provide: 'uploadservice', useClass: UploadService }

    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
