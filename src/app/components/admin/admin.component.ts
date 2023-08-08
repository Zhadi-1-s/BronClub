import { Component, OnInit } from '@angular/core';
import { Club, Place } from '../club/club.component';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';

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

  club:adminClub;

  mainPlaces: any[] = [];
  vipPlaces:any[] = [];
  mainPlacesVisible = false;
  vipPlacesVisible = false;

  users:any[];

  constructor(private userService: UserService, private route: ActivatedRoute, private clubService: ClubsService){}  

  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      const clubId = +params.get('id');
      this.clubService.getClubById(clubId).subscribe(
        (data:adminClub) => {
          this.club = data;
          this.showPlaces();
        },
        error =>{
          console.error(error);
        }
      );
    })
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
  }
  deleteUserFromTable(uid:string, place:adminPlace, area:'main'|'vip'):void{
    this.deleteBook(place, area);
    this.userService.deleteUser(uid).subscribe(
      response => {
        console.log('user deleted succesfully');
      },
      error =>{
        console.error(error)
      }
    );
  }

  deleteBook(place:adminPlace, area: 'main'| 'vip'):void{
    console.log('you clicked deleteBoko button')
    console.log(place, area)
    console.log(this.club.areas[0].vip.places[0])
    if(place.availability ==='booked'){
      place.availability = 'available';
    }
    console.log(this.club.areas[0].vip.places[0])
    // if(place.availability  === 'booked'){
    //   place.availability = 'available';
    //   this.clubService.changeAvailability(this.club).subscribe(
    //     (response)=> {
    //       console.log('availability changed succesfully');
    //     },
    //     error =>{
    //       console.error(error);
    //       place.availability = 'booked';
    //     },
    //   );
    // }
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
