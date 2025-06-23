import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoomCardComponent } from '../room-card/room-card.component';

import { Room } from '../models/room';
import { RoomDataService } from '../services/room-data.service';
import { AuthService } from '../services/authentication.service';

import { Router } from '@angular/router';

@Component({
  selector: 'app-room-listing',
  standalone: true,
  imports: [CommonModule, RoomCardComponent],
  templateUrl: './room-listing.component.html',
  styleUrl: './room-listing.component.css',
  providers: [RoomDataService]
})
export class RoomListingComponent implements OnInit {
  rooms!: Room[];
  message: string = '';

  constructor(
    private roomDataService: RoomDataService,
    private router: Router,
    private authenticationService: AuthService
  ) {
    console.log('room-listing constructor');
  }

  public isLoggedIn() {
    return this.authenticationService.isLoggedIn();
  }

  public addRoom(): void {
    this.router.navigate(['add-room']);
  }

   private getRooms(): void {
    this.roomDataService.getRooms()
      .subscribe({
        next: (value: any) => {
          this.rooms = value;
          if (value.length > 0) {
            this.message = 'There are ' + value.length + ' rooms available.';
          } else {
            this.message = 'There were no rooms retrieved from the database.';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.getRooms();
  }
}
