import { Component, OnInit } from '@angular/core';
import { ClubsService } from 'src/app/shared/clubs.service';

@Component({
  selector: 'app-filteredclubs',
  templateUrl: './filteredclubs.component.html',
  styleUrls: ['./filteredclubs.component.css']
})
export class FilteredclubsComponent implements OnInit {

  clubs: any[];
  searchClub: string;
  constructor(private clubService: ClubsService){}

  ngOnInit(): void {
    this.clubService.getClubsData().subscribe(
      data => {
        this.clubs = data;
      }
    );
  }

}
