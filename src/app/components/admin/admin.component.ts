import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';
import { NgZone } from '@angular/core';

interface adminPlace {
  place_id: number,
  availability: string;
}
interface adminClub {
  id:number,
  name:string,
  rating: string,
  photoUrl: string,
  areas : {
    main: {places:adminPlace[] };
    vip : {places:adminPlace[] };
  }[];
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private userService: UserService,
     private route: ActivatedRoute, 
     private clubService: ClubsService,){}  
  
  club:adminClub;

  mainPlaces: any[] = [];
  vipPlaces:any[] = [];
  mainPlacesVisible = false;
  vipPlacesVisible = false;
  
  users:any[];
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((userId:any) => {
      const uid = +userId.get('id');
      this.userService.getUserById(uid).subscribe(
        (data) => {
          this.users = data;
          console.warn('users taked succesfully');
        },
        error => {
          console.error(error);
        }
      );
    });  
    this.route.paramMap.subscribe((params:any) => {
      const clubId = +params.get('id');
      this.clubService.getClubById(clubId).subscribe(
        (data:adminClub) => {
          this.club = data;
          this.showPlaces();
          console.log('club initialized')
        },
        error =>{
          console.error(error);
        }
      );
    })
  } 

  deleteUserFromTable(uid:string, place:adminPlace, area:'main'|'vip'):void{
    this.deleteBook(place, area);
    this.userDelete(uid);
  }

  deleteBook(place:adminPlace, area: 'main'| 'vip'):void{
    console.log(place);
    if(place.availability === 'booked'){
      place.availability = 'available';
      if(area === 'main'){
        this.club.areas[0].main.places[place.place_id-1] = place;
      }
      else{
        this.club.areas[0].vip.places[place.place_id-1] = place;
      }
      this.clubService.changeAvailability(this.club).subscribe(
        (response)=> {
          console.log('availability changed', response)
        },
        error =>{
          console.error(error)
        }
      );
    }
  }

  userDelete(uid: string){
    this.userService.deleteUser(uid).subscribe(
      (response) => {
        console.log(response, 'user deleted succesfully')
      },
      error => {
        console.error(error)
      }
    )
  }

  showPlaces():void{
    this.mainPlaces = this.club.areas[0].main.places
    this.vipPlaces = this.club.areas[0].vip.places
  }
  isOpen : boolean = false;
  toBook():void{
    this.isOpen = true;
  }
  closeBook():void{
    this.isOpen = false;
  }
}
