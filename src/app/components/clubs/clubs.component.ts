import { Component,OnInit } from '@angular/core';
import { ClubsService } from 'src/app/shared/clubs.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs:any[];

  constructor(private clubService:ClubsService){}

  ngOnInit(): void {
   
    this.clubService.getClubsData().subscribe(
      data => {
        this.clubs = data;
        console.log(this.clubService);
      },
      error => {
        console.log(error);
      }
    );
}
}