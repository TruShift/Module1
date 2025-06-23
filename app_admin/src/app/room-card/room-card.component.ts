import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../services/authentication.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-room-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './room-card.component.html',
  styleUrls: ['./room-card.component.css']
})
export class RoomCardComponent implements OnInit {
  @Input('room') room: any;

  constructor(
    private router: Router,
    private authenticationService: AuthService
  ) {}

  ngOnInit(): void {}

  public editRoom(room: any): void {
    localStorage.removeItem('roomCode');
    localStorage.setItem('roomCode', room.code);
    this.router.navigate(['edit-room']);
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
