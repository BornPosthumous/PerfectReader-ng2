import { NgModule } from '@angular/core';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { ParagraphComponent } from './paragraphs/paragraph/paragraph.component';
import { CommonModule } from "@angular/common"

@NgModule({
    imports: [CommonModule],
    declarations: [ParagraphsComponent, ParagraphComponent],
    exports: [ParagraphsComponent, CommonModule]
})
export class ParagraphsModule { }
