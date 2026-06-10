import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';

import { TaskService } from '../../../services/task.service';
import { TaskCard } from './task-card';

describe('TaskCard', () => {
  let fixture: ComponentFixture<TaskCard>;

  const taskServiceMock = {
    updateTask: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCard],
      providers: [
        {
          provide: TaskService,
          useValue: taskServiceMock,
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCard);

    fixture.componentRef.setInput('task', {
      id: '1',
      title: 'Test task',
      description: 'Task description',
      deadline: '2026-06-10T14:30',
      priority: 'high',
      status: 'todo',
    });

    fixture.detectChanges();
  });

  it('should render task title', () => {
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.textContent).toContain('Test task');
  });
});
