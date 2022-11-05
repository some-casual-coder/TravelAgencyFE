declare var yep: any;

import { Component, OnInit } from '@angular/core';
import '../../assets/scripts/custom.js';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
<<<<<<< HEAD
    this.loadScript('../assets/scripts/custom.js');
=======
    //this.loadScript('../assets/js/script.js');
    this.loadScript('https://unpkg.com/swiper/swiper-bundle.min.js');
>>>>>>> e106330f283ff02d0ba04a6aab7ccd537f5e0e27
  }
  
  title = 'app';
  loadScript(url: string) {
    const body = <HTMLDivElement> document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);

  


}


  loadScript(url: string) {
    const body = <HTMLDivElement>document.body;
    const script = document.createElement('script');
    script.innerHTML = '';
    script.src = url;
    script.async = false;
    script.defer = true;
    body.appendChild(script);
  }
}
