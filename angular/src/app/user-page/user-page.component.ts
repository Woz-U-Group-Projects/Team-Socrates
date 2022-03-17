import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../core/services/api.service';
import { UserProfile } from '../shared/models';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss'],
})
export class UserPageComponent implements OnInit {
  constructor(
    private _apiService: ApiService,
    private _activatedRoute: ActivatedRoute
  ) {}
  profile: UserProfile;
  ngOnInit(): void {
    this._apiService
      .get(`users/profile/${this._activatedRoute.snapshot.paramMap.get('id')}`)
      .subscribe({
        next: (data: UserProfile) => {
          this.profile = data;
        },
        error: (err) => {
          console.error(err.message);
        },
        complete: () => {},
      });
  }
}
