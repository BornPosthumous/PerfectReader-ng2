/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OcrService } from './ocr.service';

describe('OcrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OcrService]
    });
  });

  it('should ...', inject([OcrService], (service: OcrService) => {
    expect(service).toBeTruthy();
  }));
});
