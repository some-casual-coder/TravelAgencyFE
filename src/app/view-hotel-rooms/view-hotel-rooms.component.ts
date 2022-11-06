import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Amenity } from 'classes/amenity';
import { Image } from 'classes/image';
import { Room } from 'classes/room';
import { Subject, takeUntil } from 'rxjs';
import { HotelService } from 'services/hotel.service';
import { RoomService } from 'services/room.service';

@Component({
  selector: 'app-view-hotel-rooms',
  templateUrl: './view-hotel-rooms.component.html',
  styleUrls: ['./view-hotel-rooms.component.css']
})
export class ViewHotelRoomsComponent implements OnInit, OnDestroy, OnChanges {

  hotelId!: number;
  rooms: Room[] = [];
  showDetails: boolean = false;
  selectedRoom: Room = new Room();
  roomImages: Image[] = [];
  selectedFiles!: FileList;

  private destroy: Subject<void> = new Subject<void>;

  constructor(private roomService: RoomService,
    private route: ActivatedRoute,
    private router: Router,
    private hotelService: HotelService
  ) { }

  ngOnInit(): void {
    this.hotelId = Number(this.route.snapshot.paramMap.get('hotelId'));
    this.retrieveRooms(this.hotelId);
  }

  ngOnChanges(changes: SimpleChanges) {
    this.viewDetails(this.selectedRoom.id);
    this.getAmenities(this.selectedRoom.id);
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  retrieveRooms(id: number) {
    this.roomService.findAllHotelRooms(this.hotelId).pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
        this.rooms = response;
      },
      error: error => {
        this.router.navigate(['/**']);
      }
    });
  }

  viewDetails(roomId: number) {
    this.roomService.findRoom(roomId).pipe(takeUntil(this.destroy)).subscribe({
      next: (response) => {
        setTimeout(() => {
          this.getRoomImages(roomId);
        }, 500);
        this.getAmenities(roomId);
        this.selectedRoom = response;
        this.showDetails = true;
      },
      error: error => {
        this.router.navigate(['/**']);
      }
    })
  }

  hideDetails(){
    this.showDetails = false;
    this.router.navigate(['/admin/rooms', this.hotelId]);
  }

  addAmenity(amenityForm: NgForm) {
    console.log(amenityForm.value)
    const amenity = new Amenity();
    amenity.title = amenityForm.value.title;
    amenity.content = amenityForm.value.content;
    amenity.roomId = this.selectedRoom.id;
    console.log(amenity);
    this.roomService.addRoomAmenity(amenity).pipe(takeUntil(this.destroy)).subscribe({
      next: response => console.log(response),
      error: error => console.log(error)
    });
  }

  getAmenities(roomId: number) {
    this.roomService.getRoomAmenities(roomId).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        this.selectedRoom.amenities = response;
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
        this.addRoomImage(url);
      },
      (err) => console.log(err)
    );
  }

  addRoomImage(url: string){
    const image = new Image();
    image.imageUrl = url;
    image.room = this.selectedRoom;
    this.roomService.addRoomImage(image).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        this.viewDetails(this.selectedRoom.id);
      },
      error: error => console.log(console.log(error))
    });
  }

  getRoomImages(roomId: number) {
    this.roomService.getRoomImages(roomId).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        this.roomImages = response;
      },
      error: error => {
        console.log(error);
      }
    });
  }

}
