import { TestBed } from '@angular/core/testing';

import { Task } from '../models/task.model';
import { TaskDbService } from './task-db.service';
import { TaskService } from './task.service';

describe('TaskService', () => {
  let service: TaskService;

  const taskDbServiceMock = {
    getAllTasks: vi.fn().mockResolvedValue([]),
    addTask: vi.fn().mockResolvedValue(undefined),
    updateTask: vi.fn().mockResolvedValue(undefined),
    deleteTask: vi.fn().mockResolvedValue(undefined),
    clearTasks: vi.fn().mockResolvedValue(undefined),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: TaskDbService,
          useValue: taskDbServiceMock,
        },
      ],
    });

    service = TestBed.inject(TaskService);
  });

  it('should sort tasks by priority descending', () => {
    const tasks: Task[] = [
      {
        id: '1',
        title: 'Low task',
        deadline: '2026-06-10T10:00',
        priority: 'low',
        status: 'todo',
      },
      {
        id: '2',
        title: 'High task',
        deadline: '2026-06-10T10:00',
        priority: 'high',
        status: 'todo',
      },
      {
        id: '3',
        title: 'Medium task',
        deadline: '2026-06-10T10:00',
        priority: 'medium',
        status: 'todo',
      },
    ];

    const result = service.sortByPriority(tasks, 'desc');

    expect(result.map((task) => task.priority)).toEqual(['high', 'medium', 'low']);
  });
});
