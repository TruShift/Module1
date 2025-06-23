import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Room } from '../models/room';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class RoomDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private url = 'http://localhost:3000/api/rooms';

  getRooms(): Observable<Room[]> {
    return this.http.get<Room[]>(this.url);
  }

  addRoom(formData: Room): Observable<Room> {
    return this.http.post<Room>(this.url, formData);
  }

  getRoom(roomCode: string): Observable<Room> {
    return this.http.get<Room>(`${this.url}/${roomCode}`);
  }

  updateRoom(formData: Room): Observable<Room> {
    return this.http.put<Room>(`${this.url}/${formData.code}`, formData);
  }
}
