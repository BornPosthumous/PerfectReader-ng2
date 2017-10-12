/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MagickInputComponent } from './magick-input.component';

describe('MagickInputComponent', () => {
  let component: MagickInputComponent;
  let fixture: ComponentFixture<MagickInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagickInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagickInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
