import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import {
  HttpService,
  ServicesModule,
  TextService,
  WikiService,
  UploadService,
  OcrService
} from './services/services.module';
import { ParagraphsModule } from './components/paragraphs.module'
import { WordDirective } from './directives/word.directive'
import { StoreModule } from '@ngrx/store'
import { definitions } from './reducers/definitions.reducer'
import { paragraphs } from './reducers/paragraphs.reducer'
import { current } from './reducers/current.reducer'
import { books } from './reducers/books.reducer'
import { wiki } from './reducers/wiki.reducer'
import { magickOptions } from './reducers/options.reducer'
import { Store } from '@ngrx/store'
import { OcrComponent, DashboardTileComponent } from './components/ocr/ocr.component'
import { CanvasWordComponent } from './components/canvas-word/canvas-word.component'
import { LocationStrategy, HashLocationStrategy } from '@angular/common'
import { routes } from './routes'

@NgModule({
  imports: [
    BrowserModule, // ngDep
    FormsModule, // ngDep
    HttpModule, // ngDep
    JsonpModule, //ngDep
    StoreModule.provideStore({ definitions, paragraphs, current, books, wiki, magickOptions }),
    ParagraphsModule,
    ServicesModule.forRoot(),
    RouterModule.forRoot(routes),
  ],
  declarations: [
    AppComponent,
  ],
  exports: [],
  providers: [
    { provide: 'httpservice', useClass: HttpService },
    { provide: 'text', useClass: TextService },
    { provide: 'wikiservice', useClass: WikiService },
    { provide: 'uploadservice', useClass: UploadService },
    { provide: 'ocrservice', useClass: OcrService },
  ],
  bootstrap: [AppComponent],
  entryComponents: [CanvasWordComponent]
})
export class AppModule { }
