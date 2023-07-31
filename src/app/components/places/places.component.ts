import { Component,OnInit,Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styleUrls: ['./places.component.css']
})
export class PlacesComponent implements OnInit {

  constructor(private route: ActivatedRoute, private clubService: ClubsService){}

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

  getClubDetails(id:number): any{
    return this.clubService.getClubById(id)
  }

  club: any;
  
  mainPlaces: any[] = [];
  vipPlaces:any[] = [];

  showPlaces(area:'main'| 'vip'):void{
    this.mainPlaces = area === 'main' ? this.club.areas[0].main.places : [];
    this.vipPlaces = area === 'vip' ? this.club.areas[0].vip.places: [];
    console.log('button clicked')
  }
}
