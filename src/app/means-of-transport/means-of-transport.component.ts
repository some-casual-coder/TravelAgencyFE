import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Image } from 'classes/image';
import { Transport } from 'classes/transport';
import { TransportAddon } from 'classes/transport-addon';
import { TransportType } from 'classes/transport-type';
import { catchError, map, Observable, of, Subject, takeUntil } from 'rxjs';
import { HotelService } from 'services/hotel.service';
import { TransportService } from 'services/transport.service';
import { UserAuthService } from 'services/user-auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-means-of-transport',
  templateUrl: './means-of-transport.component.html',
  styleUrls: ['./means-of-transport.component.css']
})
export class MeansOfTransportComponent implements OnInit {

  transports: Transport[] = [];
  transportTypes: TransportType[] = [];
  transportImages: Image[] = [];
  transportId: number = 0;
  showDetails: boolean = false;
  selectedTransport: Transport = new Transport();
  addons: TransportAddon[] = [];

  selectedFiles!: FileList;

  latitude!: number;
  longitude!: number;
  mapNeeded: boolean = false;
  selectedMarkers: boolean = false;
  apiLoaded: Observable<boolean>;
  center: google.maps.LatLngLiteral = { lat: 0.0236, lng: 37.9062 };
  zoom = 6.5;
  options: google.maps.MapOptions = {
    mapTypeId: 'terrain',
  };

  markerOptions: google.maps.MarkerOptions = { draggable: false };
  markers: google.maps.LatLngLiteral[] = [];

  private destroy: Subject<void> = new Subject<void>;

  constructor(private transportService: TransportService,
    private router: Router,
    private httpClient: HttpClient,
    private userAuthService: UserAuthService,
    private hotelService: HotelService
  ) {
    this.apiLoaded = httpClient.jsonp(`${environment.MAPS_API}`, 'callback')
      .pipe(
        map(() => true),
        catchError(() => of(false)),
      );
  }

  ngOnInit(): void {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = { lat: position.coords.latitude, lng: position.coords.longitude };
        this.zoom = 12;
      });
    }
    this.getAllMeans();
    this.getAllTypes();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  openMap() {
    this.mapNeeded = true;
  }

  closeMap() {
    this.mapNeeded = false;
  }

  addMarker(event: google.maps.MapMouseEvent) {
    this.markers = [];
    this.markers.push(event.latLng!.toJSON());
    this.latitude = Math.round(event.latLng!.toJSON().lat * 10000000) / 10000000;
    this.longitude = Math.round(event.latLng!.toJSON().lng * 10000000) / 10000000;
    this.selectedMarkers = true;
  }

  getAllMeans() {
    this.transportService.findAllTransportMeans().pipe(takeUntil(this.destroy)).subscribe({
      next: (res: any) => this.transports = res.content,
      error: err => console.log(err)
    });
  }

  setTransportId(id: number) {
    this.transportId = id;
    this.viewDetails(id);
  }

  addTransportMeans(form: NgForm) {
    let transport = new Transport();
    let type = new TransportType();
    let user = this.userAuthService.getUser();
    type.id = form.value.type;
    transport.transportType = type;
    transport.model = form.value.model;
    transport.chargedPer = form.value.chargedPer;
    transport.capacity = form.value.capacity;
    transport.price = form.value.price;
    transport.latitude = this.latitude;
    transport.longitude = this.longitude;
    transport.owner = user;
    console.log(transport);
  }

  getAllTypes() {
    this.transportService.findAllTransportTypes().pipe(takeUntil(this.destroy)).subscribe({
      next: (res: any) => {
        this.transportTypes = res;
      },
      error: err => this.router.navigate(['/admin/transportTypes'])
    });
  }

  viewDetails(transportId: number) {
    this.transportService.findTransportMeans(transportId).pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.getTransportImages(transportId);
        }, 500);
        this.selectedTransport = response;
        this.getAddons(transportId);
        this.showDetails = true;
      },
      error: error => {
        this.router.navigate(['/**']);
      }
    })
  }

  hideDetails() {
    this.showDetails = false;
    this.router.navigate(['/admin/transport']);
  }

  saveAddon(addonForm: NgForm) {
    const addon = new TransportAddon();
    addon.title = addonForm.value.title;
    addon.description = addonForm.value.description;
    addon.transport = this.selectedTransport;
    console.log(addon);
    this.transportService.addTransportAddon(addon).pipe(takeUntil(this.destroy)).subscribe({
      next: response => this.viewDetails(this.transportId),
      error: error => console.log(error)
    });
  }

  getAddons(transportId: number) {
    this.transportService.findAllTransportAddons(transportId).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        this.addons = response;
      },
      error: error => {
        this.router.navigate(['/**']);
      }
    });
  }

  selectFile(event: any) {
    this.selectedFiles = event.target.files;
  }

  upload(form: NgForm) {
    const file = this.selectedFiles.item(0);
    let url = "";
    this.hotelService.uploadFile(file).then(
      (data: any) => {
        url = data;
        this.addTransportImage(url);
      },
      (err) => console.log(err)
    );
  }

  addTransportImage(url: string) {
    const image = new Image();
    image.imageUrl = url;
    image.transport = this.selectedTransport;
    this.transportService.addTransportImage(image).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        this.viewDetails(this.selectedTransport.id);
      },
      error: error => console.log(console.log(error))
    });
  }

  getTransportImages(transportId: number) {
    this.transportService.getTransportImages(transportId).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        this.transportImages = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
