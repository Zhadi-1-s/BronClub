import { Component,OnInit} from '@angular/core';
import { ClubsService } from 'src/app/shared/clubs.service';
import { debounceTime, distinctUntilChanged, map, startWith } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  clubs:any[] = [];

  searchClub: string = '';

  searchControl = new FormControl();

  clubVisible: boolean = false;

  constructor(private clubService:ClubsService,private router: Router){  }

  ngOnInit(): void {

    this.loadClubs();

    this.transform(this.clubs,this.searchClub);
    
  }

  loadClubs():void{
    this.clubService.getClubsData().subscribe(
      data => {
        this.clubs = data;
        console.log("data taked succesfully");
      },
      error => {
        console.log(error);
      }
    );
  }

  transform(clubs:any[], searchText: string):any[] {
    if(!clubs) return[];
    if(!searchText) return clubs;

    searchText = searchText.toLowerCase();

    return clubs.filter(val => {
        return val.name.toLowerCase().startsWith(searchText);
    });
  }

  goToClubDetail(id:number):void{
    this.router.navigate(['/clubs', id]);
  }

  filterClubs(searchTerm:string):void{
    this.clubs = this.clubs.filter(club => club.name.toLowerCase().startsWith(searchTerm.toLowerCase()) || !searchTerm);
  }
}
