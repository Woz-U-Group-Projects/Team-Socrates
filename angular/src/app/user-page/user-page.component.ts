import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ApiService } from '../core/services/api.service';
import { UserProfile } from '../shared/models';
import { Auth } from '../shared/models/auth';
import { Router } from '@angular/router';
@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit, OnDestroy {
  constructor(
    private _apiService: ApiService,
    private _activatedRoute: ActivatedRoute,
    private router: Router
  ) {}
  profile: UserProfile;
  subscription: Subscription; // Main subscription for route id change
  sessionUser: number; // <-- Will help to redirect to account page

  ngOnInit(): void {
    // Get current user ID
    this._apiService.get('users/auth').subscribe({
      next: (data: Auth) => {
        this.sessionUser = data.userId;
      },
    });
    // Assign subscription for route
    this.subscription = this._activatedRoute.paramMap.subscribe({
      next: (params) => {
        if (parseInt(params.get('id')) === this.sessionUser) {
          this.router.navigate(['account']);
        } else {
          this.newProfile(params);
        }
      },
    });
  }
  // function for using api service to get profile info
  newProfile(params): void {
    this._apiService.get(`users/profile/${params.get('id')}`).subscribe({
      next: (data: UserProfile) => {
        this.profile = data;
      },
      error: (err) => {
        console.error(err.message);
      },
      complete: () => {},
    });
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
