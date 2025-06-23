import { Routes } from '@angular/router';
import { AddTripComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';

import { AddRoomComponent } from './add-room/add-room.component';
import { EditRoomComponent } from './edit-room/edit-room.component';
import { RoomListingComponent } from './room-listing/room-listing.component';

import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'add-trip', component: AddTripComponent},
    { path: 'edit-trip', component: EditTripComponent },
    { path: 'add-room', component: AddRoomComponent },
    { path: 'edit-room', component: EditRoomComponent },
    { path: 'rooms', component: RoomListingComponent },
    { path: 'login', component: LoginComponent},
    { path: '', component: TripListingComponent, pathMatch: 'full'}
];
