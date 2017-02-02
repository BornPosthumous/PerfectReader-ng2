import { NgModule } from '@angular/core';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { ParagraphComponent } from './paragraphs/paragraph/paragraph.component';
import { CommonModule } from "@angular/common";
import { ParagraphDetailComponent } from './paragraphs/paragraph-detail/paragraph-detail.component';

@NgModule({
    imports: [CommonModule],
    declarations: [ParagraphsComponent, ParagraphComponent, ParagraphDetailComponent],
    exports: [ParagraphsComponent, CommonModule]
})
export class ParagraphsModule { }
