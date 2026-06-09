import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { TaskList } from "../../shared/components/task-list/task-list";

@Component({
  selector: 'app-home',
  imports: [TaskList],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
}
