import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../housing.service';
import { HousingLocation } from '../housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <article>
      <img class="listing-photo" [src]="housingLocation?.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation?.name}}</h2>
       </section>

       <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li>Units Available: {{housingLocation?.availableUnits}}</li>
          <li>Does this location have wifi: {{housingLocation?.wifi}}</li>
          <li>Does this location have Laundry: {{housingLocation?.laundry}}</li>

        </ul>
       </section>
       <section class="listing-apply">
       <h2 class="section-heading">Apply to Live here</h2>
       <form [formGroup]="applyForm" (submit)="submitApplication()">
        <label for="first_name" >FirstName</label>
        <input type="text" id="first_name" formControlName="firstName"/>
        <label for="last_name" >LastName</label>
        <input type="text" id="last_name" formControlName="lastName"/>
        <label for="email" >Email</label>
        <input type="email" id="email" formControlName="email"/>
        <button class="primary" type="submit">Apply Now </button>
       </form>
       </section>
    </article>
  `,
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute)
  housingService = inject(HousingService);
  housingLocation: HousingLocation | undefined;
  applyForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
  });

  constructor() {
    const housingLocationId = Number(this.route.snapshot.params["id"]);

    this.housingService.getHousingLocationById(housingLocationId).then((housingLocation) => {
      this.housingLocation =housingLocation;
    });

    }

   submitApplication() {
    this.housingService.submitApplication(
      this.applyForm.value.firstName ?? '',
      this.applyForm.value.lastName ?? '',
      this.applyForm.value.email ?? ''
    );
}
}
