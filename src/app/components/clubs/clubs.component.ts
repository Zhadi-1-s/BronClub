import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClubsService } from 'src/app/shared/clubs.service';

@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent implements OnInit {

  clubs:any[];

  constructor(private clubService:ClubsService, private router: Router){}

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

  goToClubDetail(id:number):void{
    this.router.navigate(['/clubs', id]);
  }

}