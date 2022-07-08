import { Component, OnInit } from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../payloads/book.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tags: string[] = [];
  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getTags().subscribe(data => {
      this.tags = data;
    });
  }

  getBooksByTag(tag: string) : Book[] {
    this.bookService.getBooksByTag(tag).subscribe(data => {
      this.books = data;
    });
    console.log(this.books);
    return this.books;
  }

  getTags(): string[] {
    return this.tags;
  }

}
