import { Component,OnInit} from '@angular/core';
import { ClubsService } from 'src/app/shared/clubs.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

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
