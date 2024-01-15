import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DecisionModellerComponent } from './decision-modeller.component';

describe('DecisionModellerComponent', () => {
  let component: DecisionModellerComponent;
  let fixture: ComponentFixture<DecisionModellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DecisionModellerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DecisionModellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
