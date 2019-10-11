import { Component, OnInit, Input, EventEmitter, Output } from "@angular/core";
import { Todo } from "../../models/Todo";
import { TodoService } from "../../services/todo.service";

@Component({
  selector: "app-todo-item",
  templateUrl: "./todo-item.component.html",
  styleUrls: ["./todo-item.component.css"]
})
export class TodoItemComponent implements OnInit {
  //https://angular.io/guide/template-syntax#ngfor-with-trackby
  @Input() todo: Todo;
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) {}

  ngOnInit() {}

  //Set dynamic classes
  setClasses() {
    let classes = {
      todo: true,
      "is-completed": this.todo.completed
    };
    return classes;
  }

  onToggle(todo) {
    console.log(todo, " - todo onToggle");
    //toggle in UI
    todo.completed = !todo.completed;

    //toggle on Server
    this.todoService.toggleCompleted(todo).subscribe(todo => {
      console.log(todo, " - todo at [TodoItemComponent] onToggle");
    });
  }

  onDelete(todo) {
    this.deleteTodo.emit(todo);
    console.log(todo, " - todo onDelete");
  }
}
