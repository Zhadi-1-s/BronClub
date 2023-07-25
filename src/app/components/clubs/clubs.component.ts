import { Component } from '@angular/core';
import { Clubs } from 'src/app/shared/clubs';
@Component({
  selector: 'app-clubs',
  templateUrl: './clubs.component.html',
  styleUrls: ['./clubs.component.css']
})
export class ClubsComponent {

  public clubs: Clubs[]= [
    {
      id: 1,
      name: 'Bro',
      rating: 5.0,
      photoUrl: '/assets/bro.jpg'
    },
    {
      id:2,
      name:'Meta',
      rating:5.0,
      photoUrl:'/assets/meta.jpg'
    },
    {
      id:3,
      name:'Dofg',
      rating:5.0,
      photoUrl:'someUrls'
    }
  ]

}
