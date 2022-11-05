import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Image } from 'classes/image';
import { Transport } from 'classes/transport';
import { TransportAddon } from 'classes/transport-addon';
import { TransportType } from 'classes/transport-type';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransportService {

  API_PATH = `${environment.API_PATH}`;

  constructor(private httpClient: HttpClient) { }

  public addTransportType(type: TransportType) {
    return this.httpClient.post(this.API_PATH + "/transport/type/add", type);
  }

  public findAllTransportTypes(): Observable<TransportType>{
    return this.httpClient.get<TransportType>(this.API_PATH + "/transport/type/all");
  }

  public addTransportMeans(transport: Transport) {
    return this.httpClient.post(this.API_PATH + "/transport/add", transport);
  }

  public findTransportMeans(id:number): Observable<Transport>{
    return this.httpClient.get<Transport>(this.API_PATH + "/transport/get?transportId=" + id);
  }

  public updateTransportMeans(transport:Transport): Observable<Transport>{
    return this.httpClient.put<Transport>(this.API_PATH + "/transport/update", transport);
  }

  public deleteTransportMeans(id:number){
    return this.httpClient.delete(this.API_PATH + "/transport/delete?transportId=" + id);
  }

  public findTransportOwnedBy(userId:number): Observable<Transport[]>{
    return this.httpClient.get<Transport[]>(this.API_PATH + "/transport/all/owner?ownerId=" + userId);
  }

  public addTransportAddon(addon: TransportAddon): Observable<TransportAddon>{
    return this.httpClient.post<TransportAddon>(this.API_PATH + "/transport/addon/add", addon);
  }

  public updateTransportAddon(addon: TransportAddon): Observable<TransportAddon>{
    return this.httpClient.put<TransportAddon>(this.API_PATH + "/transport/addon/update", addon);
  }

  public findAllTransportAddons(transportId:number): Observable<TransportAddon[]>{
    return this.httpClient.get<TransportAddon[]>(this.API_PATH + "/transport/addon/all?transportId=" + transportId);
  }

  public deleteAddon(addonId:number){
    return this.httpClient.delete(this.API_PATH + "/transport/addon/delete?addonId=" + addonId);
  }

  public addTransportImage(image: Image): Observable<Image>{
    return this.httpClient.post<Image>(this.API_PATH + "/transport/image/add", image);
  }

  public getTransportImages(transportId:number): Observable<Image[]>{
    return this.httpClient.get<Image[]>(this.API_PATH + "/transport/image/all?transportId=" + transportId);
  }

  public deleteTransportImage(id:number){
    return this.httpClient.delete(this.API_PATH + "/transport/image/delete?imageId=" + id);
  }

  public findAllTransportMeans() {
    return this.httpClient.get(this.API_PATH + "/transport/all");
  }

  public findAllTransportNearby(lat:number, lng:number): Observable<Transport[]> {
    const params = new HttpParams()
    .set("lat", lat)
    .set("lng", lng);
    return this.httpClient.get<Transport[]>(this.API_PATH + "/transport/all/nearby", {params});
  }

  public findAllTransportByType(typeId:number): Observable<Transport[]>{
    return this.httpClient.get<Transport[]>(this.API_PATH + "/transport/all/type?typeId=" + typeId);
  }

  public findAllWithCapacityAbove(capacity:number): Observable<Transport[]>{
    return this.httpClient.get<Transport[]>(this.API_PATH + "/transport/all/capacity?capacity=" + capacity);
  }

  public findAllBelowPrice(price:number): Observable<Transport[]>{
    return this.httpClient.get<Transport[]>(this.API_PATH + "/transport/all/price?price=" + price);
  }

}
