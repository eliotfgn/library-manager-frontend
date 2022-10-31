import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Book} from "../../payloads/book.model";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book;
  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.bookForm = this.formBuilder.group({
      author: '',
      title: '',
      year: 0,
      collection: 'B-ok',
      nbFree: 0,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto corporis, cumque dicta fugit id maxime odit, placeat qui quibusdam repellendus saepe sed sunt temporibus tenetur ullam veritatis, vitae voluptatum?'
      }
    );
  }

  ngOnInit(): void {
  }

  addBook() {
    this.book.title = this.bookForm.get('title')?.value;
  }

}
