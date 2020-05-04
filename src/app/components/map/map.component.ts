import { Component, OnInit } from '@angular/core';
import { Marker } from '../../classes/marker.class';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MapEditComponent } from '../map-edit.component';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  markers: Marker[] = [];

  lat = 51.678418;
  lng = 7.809007;

  constructor( private snackBar: MatSnackBar,
               public dialog: MatDialog ) {
    /*
    // this lines are to add new markers that are defined. AISTRIPS FIJOS.
    const newMarker = new Marker(51.678418, 7.809007);
    this.markers.push( newMarker );
    */
   if( localStorage.getItem('markers') ) {
     this.markers = JSON.parse(localStorage.getItem('markers')); // this line it's to save the markers when u refresh.
   }
  }

  ngOnInit(): void {
  }

  addMarker( event ) {
    const coords: { lat: number, lng: number } = event.coords;
    const newMarker = new Marker( coords.lat, coords.lng );
    this.markers.push( newMarker );
    this.saveStorage();
    this.snackBar.open('Marker added', 'Close', { duration: 3000 });
  }

  deleteMarker( i: number ) {
    // click on delete and that's it.
    this.markers.splice(i, 1); // the position of the object to delete and the number of objects.
    this.saveStorage(); // save localstorage and when do u refresh the page it's not there anymore.
    this.snackBar.open('Marker deleted', 'Close', { duration: 3000 });
  }

  editMarker( marker: Marker) {
    const dialogRef = this.dialog.open(MapEditComponent, {
      width: '250px',
      data: {title: marker.title, desc: marker.desc}
      });

    dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        if ( !result ) {
          return;
        }
        marker.title = result.title;
        marker.desc = result.desc;
        this.saveStorage();
        this.snackBar.open('Marker updated', 'Close', { duration: 3000 });
      });
  }

  saveStorage() {
    localStorage.setItem( 'markers', JSON.stringify( this.markers ) );
 }
}
