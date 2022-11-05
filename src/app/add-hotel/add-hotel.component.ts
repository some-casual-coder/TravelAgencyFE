import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hotel } from 'classes/hotel';
import { NotifyWhenReady } from 'classes/notify-when-ready';
import { User } from 'classes/user';
import { map, catchError, of, Observable, Subject, takeUntil, tap } from 'rxjs';
import { AdminService } from 'services/admin.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-hotel',
  templateUrl: './add-hotel.component.html',
  styleUrls: ['./add-hotel.component.css']
})
export class AddHotelComponent implements OnInit, OnDestroy {

  private destroy: Subject<void> = new Subject<void>;

  latitude!: number;
  longitude!: number;
  fileLink: any = "";
  loading: boolean = false;
  file!: File;
  hotel: Hotel = new Hotel();
  selectedFiles!: FileList;

  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = { lat: 0.0236, lng: 37.9062 };
  zoom = 6.5;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markers: google.maps.LatLngLiteral[] = [];


  ngOnInit(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {lat: position.coords.latitude, lng: position.coords.longitude};
        this.zoom = 12;
      });
    }
    // console.log(process.env);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markers = [];
    this.markers.push(event.latLng!.toJSON());
    this.latitude = Math.round(event.latLng!.toJSON().lat * 10000000) / 10000000;
    this.longitude = Math.round(event.latLng!.toJSON().lng * 10000000) / 10000000;
    // this.longitude = event.latLng?.toJSON().lng;
    // this.latitude = event.latLng?.toJSON().lat;
  }

  constructor(httpClient: HttpClient, private adminService: AdminService) {
    this.apiLoaded = httpClient.jsonp(`${environment.MAPS_API}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  upload(hotelForm: NgForm) {
    const file = this.selectedFiles.item(0);
    const owner = new User();
    this.adminService.uploadFile(file).then(
      (data) => {
        owner.id = 25;
        this.fileLink = data;
        this.hotel.latitude = this.latitude;
        this.hotel.longitude = this.longitude;
        this.hotel.name = hotelForm.value.name;
        this.hotel.town = hotelForm.value.town;
        this.hotel.imageUrl = this.fileLink;
        this.hotel.user = owner;
        console.log(this.hotel);
        this.addHotel(this.hotel);
      },
      (err) => console.log(err)
    );
  }

  addHotel(hotelData: Hotel) {
    this.adminService.addHotel(hotelData).pipe(takeUntil(this.destroy))
      .subscribe({
        next: (response) => console.log(response),
        error: (error) => console.log(error),
      });
  }



  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

}
