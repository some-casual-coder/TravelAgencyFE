import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hotel } from 'classes/hotel';
import { Subject, takeUntil } from 'rxjs';
import { HotelService } from 'services/hotel.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit, OnDestroy {

  hotels: Hotel[] = [];
  userEmail: string | undefined;
  hotelId: number | undefined;

  private destroy: Subject<void> = new Subject<void>;

  constructor(private hotelService:HotelService) { }

  ngOnInit(): void {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  findAll(){
    this.hotelService.findAllHotels().pipe(takeUntil(this.destroy)).subscribe({
      next: (response:any) => {this.hotels = response.content;},
      error: error => console.log(error)
    });
  }

  setHotelId(id:number){
    this.hotelId = id;
  }

}
