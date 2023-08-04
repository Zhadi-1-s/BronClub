import { Component, OnInit } from '@angular/core';
import { Club } from '../club/club.component';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  adminClub:Club;

  mainPlaces: any[] = [];
  vipPlaces:any[] = [];
  mainPlacesVisible = false;
  vipPlacesVisible = false;

  users:any[];

  constructor(private userService: UserService){}  

  ngOnInit(): void {
      this.userService.getUser().subscribe(
        data => {
          this.users = data;
          console.log("get")
        },
        error => {
          console.error(error)
        }
      );
  }


}
