import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Booking } from 'classes/booking';
import { Payment } from 'classes/payment';
import { TripOption } from 'classes/trip-option';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  
  API_PATH = `${environment.API_PATH}`;

  constructor(private httpClient: HttpClient) { }

  // Booking makeBooking(Booking booking);
  
  public makeBooking(booking: Booking){
    return this.httpClient.post(this.API_PATH + "/booking/add", booking);
  }

  // Booking findById(Long id);
  public findBooking(id:number): Observable<Booking>{
    return this.httpClient.get<Booking>(this.API_PATH + "/booking/get?bookingId=" + id);
  }

  // void deleteBooking(Long id);
  public cancelBooking(bookingId:number){
    return this.httpClient.delete(this.API_PATH + "/booking/cancel?bookingId=" + bookingId);
  }

  // TripOption addTripOption(TripOption tripOption);
  public addRoomImage(option: TripOption): Observable<TripOption>{
    return this.httpClient.post<TripOption>(this.API_PATH + "/booking/option/add", option);
  }

  // TripOption findOptionById(Long id);
  public findOptionById(optionId:number): Observable<TripOption>{
    return this.httpClient.get<TripOption>(this.API_PATH + "/booking/option/get?optionId=" + optionId);
  }

  // void removeTripOption(Long id);
  public removeTripOption(optionId:number){
    return this.httpClient.delete(this.API_PATH + "/booking/option/remove?optionId=" + optionId);
  }

  // UserPayment makePayment(UserPayment payment);
  public makePayment(payment: Payment): Observable<Payment>{
    return this.httpClient.post<Payment>(this.API_PATH + "/booking/makePayment", payment);
  }

  // List<Booking> findAllBookings();
  public findAllBookings(): Observable<Booking[]>{
    return this.httpClient.get<Booking[]>(this.API_PATH + "/booking/all");
  }

  // List<TripOption> findAllTripOptionsForBooking(Booking booking);
  public findAllTripOptionsForBooking(bookingId:number): Observable<TripOption[]>{
    return this.httpClient.get<TripOption[]>(this.API_PATH + "/booking/option/all?bookingId=" + bookingId);
  }

  // List<TripOption> findBookingsForTransport(Transport transport);
  public findBookingsForTransport(transportId:number): Observable<TripOption[]>{
    return this.httpClient.get<TripOption[]>(this.API_PATH + "/booking/transport/all?transportId=" + transportId);
  }

  // List<Booking> findAllBookingsForUser(User user);
  public findAllBookingsForUser(userId:number): Observable<Booking[]>{
    return this.httpClient.get<Booking[]>(this.API_PATH + "/booking/user/all?userId=" + userId);
  }

  // List<Booking> findBookingsForRoom(Room room);
  public findBookingsForRoom(roomId:number): Observable<Booking[]>{
    return this.httpClient.get<Booking[]>(this.API_PATH + "/booking/room/all?roomId=" + roomId);
  }

  // List<Booking> findBookingsRequiringConfirmation(Long roomId, Long userId);
  public findBookingsRequiringConfirmation(roomId:number, userId: number): Observable<Booking[]>{
    const params = new HttpParams()
    .set("roomId", roomId)
    .set("userId", userId);
    return this.httpClient.get<Booking[]>(this.API_PATH + "/booking/room/confirmation", {params});
  }

  // List<UserPayment> findAllPaymentsLatest();
  public findAllPaymentsLatest(): Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(this.API_PATH + "/payments/all");
  }

  // List<UserPayment> findAllPaymentsForUser(User user);
  public findAllPaymentsForUser(userId: number): Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(this.API_PATH + "/payments/user/all?userId=" + userId);
  }

  // List<UserPayment> findAllPaymentsByMethod(String paymentMethod);
  public findAllPaymentsByMethod(method: string): Observable<Payment[]>{
    return this.httpClient.get<Payment[]>(this.API_PATH + "/payments/method?method=" + method);
  }
}
