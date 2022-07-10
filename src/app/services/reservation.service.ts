import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ReservationPayload} from "../payloads/reservation.payload";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  constructor(private http: HttpClient) { }

  public reserve(payload: ReservationPayload): Observable<any> {
    console.log(payload);
    return this.http.post('http://localhost:8080/api/reservations/new', payload);
  }
}
