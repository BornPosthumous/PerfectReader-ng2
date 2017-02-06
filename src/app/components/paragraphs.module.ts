import { NgModule } from '@angular/core';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { ParagraphComponent } from './paragraphs/paragraph/paragraph.component';
import { CommonModule } from "@angular/common";
import { ParagraphDetailComponent } from './paragraphs/paragraph-detail/paragraph-detail.component';
import { WordDirective } from './paragraphs/paragraph-detail/paragraph-detail.component';
import { WordsComponent } from './words/words.component';
import { DefinitionsComponent } from './definitions/definitions.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ParagraphsComponent, ParagraphComponent, ParagraphDetailComponent, WordDirective, WordsComponent, DefinitionsComponent],
    exports: [ParagraphsComponent, DefinitionsComponent, CommonModule,]
})
export class ParagraphsModule { }
