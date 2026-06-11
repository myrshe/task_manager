import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { vi } from 'vitest';

import { TaskService } from '../../services/task.service';
import { TaskCreate } from './task-create';

describe('TaskCreate', () => {
  let component: TaskCreate;
  let fixture: ComponentFixture<TaskCreate>;

  const taskServiceMock = {
    addTask: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCreate],
      providers: [
        provideRouter([]),
        {
          provide: TaskService,
          useValue: taskServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be invalid when title is empty', () => {
    component.form.controls.title.setValue('');

    expect(component.form.controls.title.invalid).toBeTruthy();
    expect(component.form.invalid).toBeTruthy();
  });
});
