import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookService} from "../../services/book.service";
import {Book} from "../../payloads/book.model";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tags: string[] = [];
  booksLoaded = false;
  booksByTag: Map<string, Book[]> = new Map();
  color: string;
  colors: string[] = ['bg-indigo-400', 'bg-yellow-200', 'bg-red-200', 'bg-green-200', 'bg-blue-300', 'bg-magenta-200', 'bg-orange-200', 'bg-purple-200'];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getTags().subscribe(data => {
      this.tags = data;
    }, error => {
      console.log(error);
    }, () => {
      for (let i = 0; i < this.tags.length; i++) {
        this.getBooksByTag(this.tags[i]);
      }
      this.booksLoaded = true;
    });

  }

  getBooksByTag(tag: string){
    this.bookService.getBooksByTag(tag).subscribe(data => {
      this.booksByTag.set(tag, data);
      }, error => {
      console.log(error);
      }, () => {
      console.log(this.booksByTag);
    }
    );
  }

  getTags(): string[] {
    return this.tags;
  }

  sizeForTag(tag: string): number {
    // @ts-ignore
    return this.booksByTag.get(tag).length;
  }

  getColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  slideLeft(index: number) {
    let bookSection = document.getElementsByClassName('books-section')[index];
    // @ts-ignore
    bookSection.style.transform = 'translateX(-37.5%)';
  }

  slideRight(index: number) {
    let bookSection = document.getElementsByClassName('books-section')[index];
    // @ts-ignore
    bookSection.style.transform = 'translateX(0%)';
  }
}
