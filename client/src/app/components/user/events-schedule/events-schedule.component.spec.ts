import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventsScheduleComponent } from './events-schedule.component';

describe('EventsScheduleComponent', () => {
  let component: EventsScheduleComponent;
  let fixture: ComponentFixture<EventsScheduleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventsScheduleComponent]
    });
    fixture = TestBed.createComponent(EventsScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
