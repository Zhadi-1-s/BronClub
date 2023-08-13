import { Component,OnInit,Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';
import { UserService } from 'src/app/shared/user.service';
import {v4 as uuidv4} from 'uuid';
import { Place } from '../club/club.component';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private clubService: ClubsService, private userService: UserService, private router:Router){}

  club: any;
  
  mainPlaces: any[] = [];
  vipPlaces:any[] = [];
  
  clubId:number;
  userName:string = '';
  telephone:string = '';
  placeId: number;
  
  mainPlacesVisible = false;
  vipPlacesVisible = false;

  isOpen : boolean = false;

  place:Place;
  areaName: 'main' | 'vip' = 'main';
  
  ngOnInit(): void {
    this.route.paramMap.subscribe((params:any) => {
      const clubId = +params.get('id');
      this.clubService.getClubById(clubId).subscribe(
        data => {
          this.club = data;
        },
        error =>{
          console.log(error);
        }
        );
      })  
    }
    
    goToAdmin(id:number):void{
      this.router.navigate(['/admin',id])
    }

    booking(userName:string, tel: string, place: Place, area: 'main'| 'vip', date:string, time:string):void{
      this.bookPlace(place, area);
      this.postUser(userName, tel,date, time, area, place);
      this.closeBook()
    }

    postUser(userName:string, telephone: string, date: string, time:string, area: 'main'| 'vip', place:Place){
    const newUser = {
      id: uuidv4(),
      clubId: this.clubId,
      userName,
      telephone,
      date,
      time,
      area,
      place,
      placeId: this.placeId
    };
    this.userService.createUser(newUser).subscribe(
      (response)=> {
        alert('user created succesfully');
        console.log('the created user is ', userName, telephone)
      },
      error => {
        console.error( 'the error is ', error, this.clubId , this.placeId)
      }
    );
  }
  bookPlace(place:Place, area: 'main'| 'vip'):void{
    if(place.availability  === 'available'){
      place.availability = 'booked';
      this.clubService.changeAvailability(this.club).subscribe(
        ()=> {
          console.log('availability changed succesfully');
        },
        error =>{
          console.error(error);
          place.availability = 'available';
        }
      );
    }
  }

  getClubDetails(id:number): any{
    return this.clubService.getClubById(id)
  }

  showPlaces(area:'main'| 'vip'):void{
    if(area === 'main'){
      this.mainPlaces = this.club.areas[0].main.places;
      this.vipPlaces = [];
    }
    else if(area === 'vip'){
      this.vipPlaces = this.club.areas[0].vip.places;
      this.mainPlaces = [];
    }
    this.mainPlacesVisible = area === 'main';
    this.vipPlacesVisible = area === 'vip';
  }

  toBook(id:number,place: Place, clubId:number, name:'main'|'vip'):void{
    this.isOpen = true;
    this.placeId = id;
    this.clubId = clubId;
    this.place = place
    this.areaName = name;
  }
  closeBook():void{
    this.isOpen = false;
    this.placeId = 0;
    this.clubId = 0;
  }
}
