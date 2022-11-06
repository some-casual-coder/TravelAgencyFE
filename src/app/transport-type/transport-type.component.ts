import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TransportType } from 'classes/transport-type';
import { Subject, takeUntil } from 'rxjs';
import { TransportService } from 'services/transport.service';

@Component({
  selector: 'app-transport-type',
  templateUrl: './transport-type.component.html',
  styleUrls: ['./transport-type.component.css']
})
export class TransportTypeComponent implements OnInit {

  transportTypes: TransportType[] = [];

  private destroy: Subject<void> = new Subject<void>;

  constructor(private transportService: TransportService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getAllTypes();
  }

  ngOnDestroy(): void {
    this.destroy.next();
    this.destroy.complete();
  }

  addTransportType(form: NgForm) {
    let type = new TransportType();
    type.type = form.value.type;
    this.transportService.addTransportType(type).pipe(takeUntil(this.destroy)).subscribe({
      next: response => {
        this.router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/admin/transportTypes']);
        });
      },
      error: error => {
        console.log(error);
      }
    });
  }

  getAllTypes(){
    this.transportService.findAllTransportTypes().pipe(takeUntil(this.destroy)).subscribe({
      next: (res:any) => {
        this.transportTypes = res;
      },
      error: err => console.log(err)
    });
  }
}
