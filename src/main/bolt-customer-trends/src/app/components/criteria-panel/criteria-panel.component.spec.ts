import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriteriaPanelComponent } from './criteria-panel.component';

describe('CriteriaPanelComponent', () => {
  let component: CriteriaPanelComponent;
  let fixture: ComponentFixture<CriteriaPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriteriaPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriteriaPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
