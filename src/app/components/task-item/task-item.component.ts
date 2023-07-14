import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/types/Task';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { TaskService } from 'src/app/services/task.service';
@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css'],
})
export class TaskItemComponent implements OnInit {
  @Input() task: Task;
  @Output() deleteTaskOnDelete: EventEmitter<Task> = new EventEmitter();
  @Output() toggleOnReminder: EventEmitter<Task> = new EventEmitter();
  faTimes = faTimes;

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {}

  onDelete(task: Task) {
    this.deleteTaskOnDelete.emit(task);
  }

  onToogle(task: Task) {
    console.log('here');

    this.toggleOnReminder.emit(task);
  }
}
