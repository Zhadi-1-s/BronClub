import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';

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

@Component({
  selector: 'app-club',
  templateUrl: './club.component.html',
  styleUrls: ['./club.component.css']
})
export class ClubComponent implements OnInit {

  club:Club;

  mainPlaces: any[] = [];
  vipPlaces:any[] = [];
  mainPlacesVisible = false;
  vipPlacesVisible = false;


  isOpen: boolean = false;

  toBook: boolean = false;

  constructor(private route : ActivatedRoute, private clubService: ClubsService,private router: Router){}

  ngOnInit(): void {
      this.route.paramMap.subscribe((params:any) => {
        const clubId = +params.get('id');
        this.clubService.getClubById(clubId).subscribe(
          (data:Club) => {
            this.club = data;
            this.showPlaces('main');
          },
          error =>{
            console.error(error);
          }
        );
      })
    }

    goToPlaces(id: number): void {
      this.router.navigate(['/clubs/places', id]);
    }

  getClubDetails(id:number): any{
    return this.clubService.getClubById(id)
  }
  showPlaces(area:'main'| 'vip'):void{
    this.mainPlaces = area === 'main' ? this.club.areas[0].main.places : [];
    this.vipPlaces = area === 'vip' ? this.club.areas[0].vip.places: [];
    this.mainPlacesVisible = area === 'main';
    this.vipPlacesVisible = area === 'vip';
    console.log('button clicked')
  }
  openBook():void{
    this.isOpen = true;
  }
  closeBook():void{
    this.isOpen = false;
    this.mainPlaces = [];
    this.vipPlaces = [];
  }
}
