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
  colors: string[] = ['bg-indigo-400', 'bg-yellow-200', 'bg-red-200', 'bg-green-200', 'bg-blue-300', 'bg-red-200', 'bg-orange-200', 'bg-purple-200', 'bg-red-400'];
  @ViewChild('leftButton', {static: true}) leftButton: any;
  @ViewChild('rightButton', {static: true}) rightButton: { toArray: () => { nativeElement: any; }[]; };
  showLeftButton: Map<string, boolean> = new Map<string, boolean>();
  showRightButton: Map<string, boolean> = new Map<string, boolean>();

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getTags().subscribe(data => {
      this.tags = data;
    }, error => {
    }, () => {
      for (let i = 0; i < this.tags.length; i++) {
        this.getBooksByTag(this.tags[i]);
      }
      this.booksLoaded = true;
      for (let i = 0; i < this.tags.length; i++) {
        this.showLeftButton.set(this.tags[i], false);
        this.showRightButton.set(this.tags[i], true);
      }
    });

  }

  getBooksByTag(tag: string){
    this.bookService.getBooksByTag(tag).subscribe(data => {
      this.booksByTag.set(tag, data);
      }, error => {
      }, () => {
      // @ts-ignore
        for (let book of this.booksByTag.get(tag)) {
          book.cover = this.getColor();
        }
    }
    );
  }

  getTags(): string[] {
    return this.tags;
  }

  sizeForTag(tag: string): number {
    // @ts-ignore
    return this.booksByTag.get(tag)?.length;
  }

  getColor(): string {
    return this.colors[Math.floor(Math.random() * this.colors.length)];
  }

  slideLeft(index: number) {
    if (this.sizeForTag(this.tags[index]) > 3) {
      let bookSection = document.getElementsByClassName('books-section')[index];
      // @ts-ignore
      bookSection.style.transform = 'translateX(-43%)';
      this.showRightButton.set(this.tags[index], false);
      this.showLeftButton.set(this.tags[index], true);
    }
  }

  slideRight(index: number) {
    if (this.sizeForTag(this.tags[index]) > 3) {
      let bookSection = document.getElementsByClassName('books-section')[index];
      // @ts-ignore
      bookSection.style.transform = 'translateX(0%)';
      this.showRightButton.set(this.tags[index], true);
      this.showLeftButton.set(this.tags[index], false);
    }
  }

  getBooks(tag: string, index: number) {
    let section = document.getElementsByClassName('tag-section')[index];
    if (section.classList.contains('tag-section')) {
      return this.booksByTag?.get(tag)?.slice(0, 6);
    } else {
      return this.booksByTag?.get(tag);
    }
  }

  appearSection(index: number) {
    let section = document.getElementsByClassName('tag-section')[index];
    let filter = document.getElementsByClassName('filter')[0];
    filter.classList.remove('hidden');
    section.classList.remove('tag-section');
    section.classList.add('section-full');
    this.slideRight(index);
  }

  hideSection(index: number) {
    let section = document.getElementsByClassName('section-full')[0];
    let filter = document.getElementsByClassName('filter')[0];
    filter.classList.add('hidden');
    section.classList.remove('section-full');
    section.classList.add('tag-section');
  }
}
