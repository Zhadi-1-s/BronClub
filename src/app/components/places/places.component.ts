import { Component,OnInit,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';
import { UserService } from 'src/app/shared/user.service';
import {v4 as uuidv4} from 'uuid';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private clubService: ClubsService, private userService: UserService){}

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
    
    postUser(userName:string, telephone: string){
    const newUser = {
      id: uuidv4(),
      clubId: this.clubId,
      userName,
      telephone,
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
    console.log('button clicked')
  }

  toBook(id:number, clubId:number):void{
    this.isOpen = true;
    this.placeId = id;
    this.clubId = clubId;
    console.log(id, clubId);
  }
  closeBook():void{
    this.isOpen = false;
    this.placeId = 0;
    this.clubId = 0;
  }
}
