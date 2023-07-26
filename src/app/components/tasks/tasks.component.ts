import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { Task } from 'src/app/types/Task';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  toDoTasks: Task[] = [];
  doneTasks: Task[] = [];
  numberOfTasks: number;

  constructor(
    private taskService: TaskService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.taskService.getTasks().subscribe((tasks) => {
      this.toDoTasks = tasks;
      this.doneTasks.push({
        text: 'Do Homework',
        day: 'July 24th at 3:30pm',
        reminder: true,
      });
      this.numberOfTasks = this.toDoTasks.length;
    });
  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((task) => {
      this.toDoTasks.push(task);
      this.numberOfTasks++;
    });
  }

  deleteTask(task: Task) {
    this.taskService.deleteTask(task).subscribe(() => {
      this.toDoTasks = this.toDoTasks.filter((t) => t.id !== task.id);
      this.numberOfTasks--;
    });
  }

  toogleReminder(task: Task) {
    task.reminder = !task.reminder;
    this.taskService.updateTask(task).subscribe();
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.toDoTasks = [...this.toDoTasks];
      this.doneTasks = [...this.doneTasks];
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.toDoTasks = [...this.toDoTasks];
      this.doneTasks = [...this.doneTasks];
    }
  }
}
