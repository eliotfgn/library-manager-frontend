import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import {BookService} from "../../services/book.service";
import {Book} from "../../payloads/book.model";

@Injectable({
  providedIn: 'root'
})
export class BookResolver implements Resolve<any> {

  constructor(private bookService: BookService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    console.log('start resolving');
    const id: string | null = route.paramMap.get('id');
    if (id) {
      return this.bookService.getBook(id);
    } else {
      throw new Error('No such id');
    }
  }
}
