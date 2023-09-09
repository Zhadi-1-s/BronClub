import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';
import { ViewEncapsulation } from '@angular/core';
import { trigger,transition,style,animate } from '@angular/animations';

export interface Place {
  place_id: number,
  availability: string;
}

export  interface  Club {
  id:number,
  name:string,
  rating: string,
  photoUrl: string,
  areas : {
    main: {places:Place[] };
    vip : {places:Place[] };
  }[];
}

declare var ymaps:any;

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css'],
  encapsulation: ViewEncapsulation.None,
  animations:[
    trigger('slideAnimation', [
      transition(':increment', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
      transition(':decrement', [
        style({ transform: 'translateX(-100%)' }),
        animate('500ms ease-out', style({ transform: 'translateX(0)' })),
      ]),
    ]),
  ]
})
export class ClubComponent implements OnInit {

  club:Club;

  mainPlaces: any[] = [];
  vipPlaces:any[] = [];
  mainPlacesVisible = false;
  vipPlacesVisible = false;

  isOpen: boolean = false;

  toBook: boolean = false;

  images: string[] = [
    'assets/bro/satoru.jpg',
    'assets/bro/bro.jpg',
    'assets/bro/aizen.jpg',
    'assets/bro/son.jpg',
    'assets/bro/firl.jpg',
    'assets/bro/li.jpg'
  ]

  constructor(private route : ActivatedRoute, private clubService: ClubsService,private router: Router){
    document.body.style.overflowY ='scroll'
    document.body.style.overflowX = 'hidden'
    document.body.style.backgroundColor = 'grey'
  }

  ngOnInit(): void {
      this.route.paramMap.subscribe((params:any) => {
        const clubId = +params.get('id');
        this.clubService.getClubById(clubId).subscribe(
          (data:Club) => {
            this.club = data;

          },
          error =>{
            console.error(error);
          }
        );
      })
      ymaps.ready(()=>{
        const MyMap = new ymaps.Map("map-container",{
          center: [43.208904, 76.860796],
          zoom:15
        });
        const placeMark = new ymaps.Placemark([43.208904, 76.860796],{
          balloonContent: 'Your marker content goes here'
        });
        MyMap.geoObjects.add(placeMark);
      })
    }

    goToPlaces(id: number): void {
      this.router.navigate(['/clubs/places', id]);
    }

  currentSlideIndex:number = 0;

  nextSlideClick(){
    if (this.currentSlideIndex < this.images.length -1 ){
      this.currentSlideIndex++;
    }
    else{
      this.currentSlideIndex = 0;
    }
    // const next = this.currentSlideIndex +1;
    // this.currentSlideIndex = next === this.images.length ? 0: next;
  }

  prevSlideClick(){
    if(this.currentSlideIndex > 0){
      this.currentSlideIndex--;
    }
    else{
      this.currentSlideIndex =  this.images.length - 1;
    }
    // const prev = this.currentSlideIndex - 1;
    // this.currentSlideIndex = prev < 0 ? this.images.length - 1: prev;
  }

  imageByClick(index:number): void{
    this.currentSlideIndex = index;
  }

  getClubDetails(id:number): any{
    return this.clubService.getClubById(id)
  }
}
