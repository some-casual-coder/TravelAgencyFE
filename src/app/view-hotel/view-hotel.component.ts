import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'classes/hotel';
import { Subject, takeUntil } from 'rxjs';
import { HotelService } from 'services/hotel.service';

@Component({
  selector: 'app-view-hotel',
  templateUrl: './view-hotel.component.html',
  styleUrls: ['./view-hotel.component.css']
})
export class ViewHotelComponent implements OnInit, OnDestroy, OnChanges {

  @Input() hotelId: number | undefined;

  display: boolean = false;
  hotel!:Hotel;

  private destroy:Subject<void> = new Subject<void>;

  constructor(private hotelService: HotelService,
    private router: Router
    ) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.hotelId != undefined){
      this.getHotelDetails();
    }
    setTimeout(() => {
      if(this.hotel != undefined){
        this.display = true;
      }
    }, 400);

  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  getHotelDetails(){
    this.hotelService.findHotel(this.hotelId!).pipe(takeUntil(this.destroy))
    .subscribe({
      next: (response: Hotel) => {
        console.log(response);
        this.hotel = response;
      },
      error: (error: any) => console.error(error)
    });
  }

  viewRooms(hotelId: number){
    this.router.navigate(['/admin/rooms', hotelId]);
  }

}
