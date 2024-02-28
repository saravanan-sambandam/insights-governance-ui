import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SsrsComponent } from './ssrs.component';

describe('SsrsComponent', () => {
  let component: SsrsComponent;
  let fixture: ComponentFixture<SsrsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SsrsComponent]
    });
    fixture = TestBed.createComponent(SsrsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
