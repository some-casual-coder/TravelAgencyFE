import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { Amenity } from 'classes/amenity';
import { Hotel } from 'classes/hotel';
import { Image } from 'classes/image';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HotelService {

  API_PATH = `${environment.API_PATH}`;

  constructor(private httpClient: HttpClient) { }

  uploadFile(file: any) {
    console.log("Uploading ....");
    const contentType = file.type;
    const bucket = new S3(
      {
        accessKeyId: `${environment.S3_ACCESS_KEY}`,
        secretAccessKey: `${environment.S3_SECRET_ACCESS_KEY}`,
        region: ''
      }
    );
    const params = {
      Bucket: 'travelagency-images',
      Key: file.name,
      Body: file,
      ACL: 'public-read',
      ContentType: contentType
    };
    // bucket.upload(params, function (err: any, data: any) {
    //   if (err) {
    //     console.log('There was an error uploading your file: ', err);
    //     return err;
    //   }
    //   console.log('Successfully uploaded file.', data.Location);
    //   return data.Location;
    // });
    //for upload progress   
    const promise = new Promise((resolve, reject) => {
      bucket.upload(params).on('httpUploadProgress', function (evt) {
        console.log(evt.loaded + ' of ' + evt.total + ' Bytes');
      }).send(function (err: any, data: any) {
        if (err) {
          console.log('There was an error uploading your file: ');
          reject(err);
        } else {
          resolve(data.Location);
        }
      });
    })
    return promise;
  }

  public addHotel(hotel: Hotel) {
    return this.httpClient.post(this.API_PATH + "/hotel/add", hotel);
  }

  public findHotel(id:number): Observable<Hotel>{
    return this.httpClient.get<Hotel>(this.API_PATH + "/hotel/get?hotelId=" + id);
  }

  public updateHotel(hotel:Hotel): Observable<Hotel>{
    return this.httpClient.put<Hotel>(this.API_PATH + "/hotel/update", hotel);
  }
  
  public deleteHotel(id:number){
    return this.httpClient.delete(this.API_PATH + "/hotel/delete?hotelId=" + id);
  }

  public addHotelImage(image: Image): Observable<Image>{
    return this.httpClient.post<Image>(this.API_PATH + "/hotel/image/add", image);
  }

  public getHotelImages(id:number): Observable<Image[]>{
    return this.httpClient.get<Image[]>(this.API_PATH + "/hotel/image/all?hotelId=" + id);
  }

  public deleteHotelImage(id:number){
    return this.httpClient.delete(this.API_PATH + "/hotel/image/delete?imageId=" + id);
  }

  public addHotelAmenity(amenity: Amenity): Observable<Amenity>{
    return this.httpClient.post<Amenity>(this.API_PATH + "/hotel/amenity/add", amenity);
  }

  public getHotelAmenities(id:number): Observable<Amenity[]>{
    return this.httpClient.get<Amenity[]>(this.API_PATH + "/hotel/amenity/all?hotelId=" + id);
  }

  public deleteHotelAmenity(hotelId: number, amenityId: number){
    const params = new HttpParams()
    .set("hotelId", hotelId)
    .set("amenityId", amenityId);
    return this.httpClient.delete(this.API_PATH + "/hotel/amenity/remove", {params});
  }  

  public findAllHotels() {
    return this.httpClient.get(this.API_PATH + "/hotel/all");
  }

  public findAllHotelsNearby(lat:number, lng:number): Observable<Hotel[]> {
    const params = new HttpParams()
    .set("lat", lat)
    .set("lng", lng);
    return this.httpClient.get<Hotel[]>(this.API_PATH + "/hotel/all/nearby", {params});
  }

  public findAllHotelsIn(town:string): Observable<Hotel> {
    const params = new HttpParams()
    .set("town", town);
    return this.httpClient.get<Hotel>(this.API_PATH + "/hotel/all/town", {params});
  }

  public findAllHotelsNamed(name:string): Observable<Hotel> {
    const params = new HttpParams()
    .set("name", name);
    return this.httpClient.get<Hotel>(this.API_PATH + "/hotel/all/name", {params});
  }

  public findAllHotelsAboveRating(rating:number): Observable<Hotel> {
    const params = new HttpParams()
    .set("rating", rating);
    return this.httpClient.get<Hotel>(this.API_PATH + "/hotel/all/rating", {params});
  }
}
