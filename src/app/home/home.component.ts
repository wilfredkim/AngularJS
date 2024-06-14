import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../housing-location';
import { HousingService } from '../housing.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
    <section>
     <form>
     <input type="text" placeholder="Filter by City" #filter>
     <button class="primary" type="button" (click)="filterResults(filter.value)">Search</button></form>
    </section>
    <section class ="results">
     <app-housing-location
        *ngFor="let housingLocation of filteredHousingList"
        [housingLocation]="housingLocation">
      </app-housing-location>
    </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  housingLocationList: HousingLocation[] = [];
  filteredHousingList: HousingLocation[] = [];
  housingService: HousingService = inject(HousingService);
  constructor() {
    this.housingService.getAllHousingLocations().then((housingLocationList: HousingLocation[]) => {
      this.housingLocationList =housingLocationList;
      this.filteredHousingList= housingLocationList;
    });
  }
  filterResults(text:string){
    if(!text) this.filteredHousingList = this.housingLocationList;
    this.filteredHousingList = this.housingLocationList.filter(
      housingLocation=> (housingLocation?.city.toLowerCase().includes(text.toLocaleLowerCase())||
      housingLocation?.name.toLowerCase().includes(text.toLocaleLowerCase())||
      housingLocation?.state.toLowerCase().includes(text.toLocaleLowerCase()))
    );
  }

}
