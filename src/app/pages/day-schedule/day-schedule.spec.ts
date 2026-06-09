import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaySchedule } from './day-schedule';

describe('DaySchedule', () => {
  let component: DaySchedule;
  let fixture: ComponentFixture<DaySchedule>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DaySchedule],
    }).compileComponents();

    fixture = TestBed.createComponent(DaySchedule);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
