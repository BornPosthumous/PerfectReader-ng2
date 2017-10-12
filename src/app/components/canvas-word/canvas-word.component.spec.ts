/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { OcrWordComponent } from './ocr-word.component';

describe('OcrWordComponent', () => {
  let component: OcrWordComponent;
  let fixture: ComponentFixture<OcrWordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OcrWordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OcrWordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
