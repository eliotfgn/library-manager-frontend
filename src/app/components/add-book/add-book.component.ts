import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Book} from "../../payloads/book.model";
import {BookService} from "../../services/book.service";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  book: Book;
  bookForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private bookService: BookService) {
    /*this.bookForm = this.formBuilder.group({
      author: '',
      title: '',
      year: 0,
      collection: 'B-ok',
      nbFree: 0,
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto corporis, cumque dicta fugit id maxime odit, placeat qui quibusdam repellendus saepe sed sunt temporibus tenetur ullam veritatis, vitae voluptatum?'
      }
    );*/

    this.bookForm = new FormGroup({
      title: new FormControl(null),
      author: new FormControl(null),
      year: new FormControl(null),
      collection: new FormControl(null),
      nbFree: new FormControl(null),
      description: new FormControl('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium architecto corporis, cumque dicta fugit id maxime odit, placeat qui quibusdam repellendus saepe sed sunt temporibus tenetur ullam veritatis, vitae voluptatum?')
    })
  }

  ngOnInit(): void {
  }

  addBook() {

    console.log(this.bookForm.value.title);

    this.book = {
      title : this.bookForm.value.title,
      author : this.bookForm.value.author,
      year : this.bookForm.value.year,
      collection : this.bookForm.value.collection,
      nbFree : this.bookForm.value.nbFre,
      description : this.bookForm.value.description
    };

    console.log(this.book);

    this.bookService.addBook(this.book).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    });

    this.bookForm.reset();

  }

}
