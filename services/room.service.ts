import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Amenity } from 'classes/amenity';
import { Image } from 'classes/image';
import { Room } from 'classes/room';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  API_PATH = `${environment.API_PATH}`;

  constructor(private httpClient: HttpClient) { }

  public addRoom(room: Room) {
    return this.httpClient.post(this.API_PATH + "/room/add", room);
  }

  public findRoom(id:number): Observable<Room>{
    return this.httpClient.get<Room>(this.API_PATH + "/room/get?roomId=" + id);
  }

  public updateRoom(room:Room): Observable<Room>{
    return this.httpClient.put<Room>(this.API_PATH + "/room/update", room);
  }

  public deleteRoom(id:number){
    return this.httpClient.delete(this.API_PATH + "/room/delete?roomId=" + id);
  }

  public addRoomImage(image: Image): Observable<Image>{
    return this.httpClient.post<Image>(this.API_PATH + "/room/image/add", image);
  }

  public getRoomImages(id:number): Observable<Image[]>{
    return this.httpClient.get<Image[]>(this.API_PATH + "/room/image/all?roomId=" + id);
  }

  public deleteRoomImage(id:number){
    return this.httpClient.delete(this.API_PATH + "/room/image/delete?imageId=" + id);
  }

  public addRoomAmenity(amenity: Amenity): Observable<Amenity>{
    return this.httpClient.post<Amenity>(this.API_PATH + "/room/amenity/add", amenity);
  }

  public getRoomAmenities(id:number): Observable<Amenity[]>{
    return this.httpClient.get<Amenity[]>(this.API_PATH + "/room/amenity/all?roomId=" + id);
  }

  public deleteRoomAmenity(roomId: number, amenityId: number){
    const params = new HttpParams()
    .set("roomId", roomId)
    .set("amenityId", amenityId);
    return this.httpClient.delete(this.API_PATH + "/room/amenity/remove", {params});
  }
  
  public findAllHotelRooms(hotelId:number): Observable<Room[]>{
    return this.httpClient.get<Room[]>(this.API_PATH + "/hotel/room/all?hotelId=" + hotelId);
  }

  public findRoomsAboveCapacity(capacity:number): Observable<Room[]>{
    return this.httpClient.get<Room[]>(this.API_PATH + "/room/all/capacity?capacity=" + capacity);
  }

  public findRoomsBelowPrice(price:number): Observable<Room[]>{
    return this.httpClient.get<Room[]>(this.API_PATH + "/room/all/price?price=" + price);
  }

}
