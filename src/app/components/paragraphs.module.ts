import { NgModule } from '@angular/core';
import { ParagraphsComponent } from './paragraphs/paragraphs.component';
import { CommonModule } from "@angular/common"

@NgModule({
    imports: [CommonModule],
    declarations: [ParagraphsComponent],
    exports: [ParagraphsComponent, CommonModule]
})
export class ParagraphsModule { }
