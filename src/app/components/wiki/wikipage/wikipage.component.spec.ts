/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { WikipageComponent } from './wikipage.component';

describe('WikipageComponent', () => {
  let component: WikipageComponent;
  let fixture: ComponentFixture<WikipageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WikipageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WikipageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
