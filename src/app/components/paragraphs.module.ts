import { NgModule } from '@angular/core';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { ParagraphComponent } from './paragraphs/paragraph/paragraph.component';
import { CommonModule } from "@angular/common";
import { ParagraphDetailComponent } from './paragraphs/paragraph-detail/paragraph-detail.component';
import { WordsComponent } from './words/words.component';
import { DefinitionsComponent } from './definitions/definitions.component';
import { WordDirective } from '../directives/word.directive'
import { DoubleClickDirective } from '../directives/double-click.directive';
import { WikiComponent } from './wiki/wiki.component'

@NgModule({
    imports: [CommonModule],
    declarations: [ParagraphsComponent, ParagraphComponent, ParagraphDetailComponent, WordsComponent, DefinitionsComponent, WordDirective, DoubleClickDirective, WikiComponent],
    exports: [ParagraphsComponent, DefinitionsComponent, CommonModule, WordDirective, DoubleClickDirective, WikiComponent]
})
export class ParagraphsModule { }
