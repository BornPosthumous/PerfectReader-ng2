import { NgModule } from '@angular/core';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { ParagraphComponent } from './paragraphs/paragraph/paragraph.component';
import { CommonModule } from "@angular/common";
import { ParagraphDetailComponent } from './paragraphs/paragraph-detail/paragraph-detail.component';
import { WordsComponent } from './words/words.component';
import { DefinitionsComponent } from './definitions/definitions.component';
import { WordDirective } from '../directives/word.directive'
import { DoubleClickDirective } from '../directives/double-click.directive';
import { WikiComponent } from './wiki/wiki.component';
import { WikipageComponent } from './wiki/wikipage/wikipage.component';
import { UploadComponent } from './file/upload/upload.component'
import { FileUploadModule } from "ng2-file-upload";
import { WikidataComponent } from './wiki/wikidata/wikidata.component';
import { PrettyjsonPipe } from '../pipes/prettyjson.pipe'

@NgModule({
    imports: [
        CommonModule,
        FileUploadModule,
    ],
    declarations: [
        ParagraphsComponent,
        ParagraphComponent,
        ParagraphDetailComponent,
        WordsComponent,
        DefinitionsComponent,
        WordDirective,
        DoubleClickDirective,
        WikiComponent,
        WikipageComponent,
        UploadComponent,
        WikidataComponent,
        PrettyjsonPipe

    ],
    exports: [
        ParagraphsComponent,
        DefinitionsComponent,
        CommonModule,
        WordDirective,
        DoubleClickDirective,
        WikiComponent,
        UploadComponent,
    ]
})
export class ParagraphsModule { }
