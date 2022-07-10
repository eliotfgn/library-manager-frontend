import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Book} from "../../payloads/book.model";
import {BookService} from "../../services/book.service";
import {ActivatedRoute} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";
import {ReservationPayload} from "../../payloads/reservation.payload";
import {AuthService} from "../../services/auth.service";
import {ReservationService} from "../../services/reservation.service";

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css']
})
export class BookPageComponent implements OnInit {
  reservationForm: FormGroup;
  book: Book;
  reservationPayload: ReservationPayload;
  @ViewChild('reservForm', {static:true}) reservationFormRef: ElementRef;
  @ViewChild('filter', {static:true}) filter: ElementRef;

  constructor(private bookService: BookService, private activeRoute: ActivatedRoute,
              private authService: AuthService, private reservationService: ReservationService) {
    this.reservationPayload = {
      username: this.authService.getCurrentLoggedInUser(),
      bookId: Number.parseInt(<string>this.activeRoute.snapshot.paramMap.get("id")),
      startOn: new Date(),
      endOn: new Date()
    }
  }

  ngOnInit(): void {
    this.reservationForm = new FormGroup({
      'startDate': new FormControl(null),
      'endDate': new FormControl(null),
    });

    let id = this.activeRoute.snapshot.paramMap.get("id");
    if (typeof id === "string") {
      this.bookService.getBook(Number.parseInt(id)).subscribe(data => {
        this.book = data;
      }, error => {},
        () => {
        this.bookService.getBookCover(this.book.title).subscribe(volume =>{
          for (let item of volume.items) {
            console.log(item.imageLinks.thumbnail);
          }
        });
        });
    }

  }

  appearReservationForm() {
    this.reservationFormRef.nativeElement.style.opacity = "1";
    this.reservationFormRef.nativeElement.style.transform = "scale(1)";
    this.filter.nativeElement.style.opacity = "0.5";
    this.filter.nativeElement.style.zIndex = "0";

    window.addEventListener('click', (event) => {
      if (event.target === this.filter.nativeElement) {
        this.disappearReservationForm();
      }
    });
  }

  disappearReservationForm() {
    this.reservationFormRef.nativeElement.style.opacity = "0";
    this.reservationFormRef.nativeElement.style.transform = "scale(0)";
    this.filter.nativeElement.style.opacity = "0";
    this.filter.nativeElement.style.zIndex = "-1";
  }

  reserve() {
    this.reservationPayload.startOn = this.reservationForm.value.startDate;
    this.reservationPayload.endOn = this.reservationForm.value.endDate;
    this.reservationService.reserve(this.reservationPayload).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
    }, () => {
      this.disappearReservationForm();
    }
    );
  }
}
