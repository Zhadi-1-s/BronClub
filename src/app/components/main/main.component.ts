import { Component,OnInit} from '@angular/core';
import { ClubsService } from 'src/app/shared/clubs.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  clubs:any[] = [];

  searchControl = new FormControl();

  constructor(private clubService:ClubsService){
    this.searchControl.valueChanges.pipe(debounceTime(300),
    distinctUntilChanged(),
    switchMap((searchTerm) => 
      this.clubService.searchClub(searchTerm)
      )
    )
    .subscribe((searchResults: any[]) => {
      this.clubs = searchResults;
    });
  }

  onSearchInputClear():void{
    this.clubs = [];
  }

  ngOnInit(): void {
    this.loadClubs()
    this.onSearchInputClear();
  }

  loadClubs():void{
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
