import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from "@angular/forms";
import { RoomDataService } from '../services/room-data.service';
import { Room } from '../models/room';

@Component({
  selector: 'app-edit-room',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-room.component.html',
  styleUrl: './edit-room.component.css'
})
export class EditRoomComponent implements OnInit {
  public editForm!: FormGroup;
  room!: Room;
  submitted = false;
  message: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private roomDataService: RoomDataService
  ) {}

  ngOnInit(): void {
    const roomCode = localStorage.getItem("roomCode");
    if (!roomCode) {
      alert("Could not find the stored roomCode!");
      this.router.navigate(['']);
      return;
    }

    console.log('EditRoomComponent::ngOnInit');
    console.log('roomCode: ' + roomCode);

    this.editForm = this.formBuilder.group({
      _id: [],
      code: [roomCode, Validators.required],
      name: ['', Validators.required],
      rate: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required]
    });

    this.roomDataService.getRoom(roomCode)
      .subscribe({
        next: (value: any) => {
          this.room = value;
          this.editForm.patchValue(value[0]);
          if (!value) {
            this.message = 'No Room Retrieved!';
          } else {
            this.message = 'Room: ' + roomCode + ' retrieved';
          }
          console.log(this.message);
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      });
  }

  public onSubmit(): void {
    this.submitted = true;

    if (this.editForm.valid) {
      this.roomDataService.updateRoom(this.editForm.value)
        .subscribe({
          next: (value: any) => {
            console.log(value);
            this.router.navigate(['']);
          },
          error: (error: any) => {
            console.log('Error: ' + error);
          }
        });
    }
  }

  get f() {
    return this.editForm.controls;
  }
}
