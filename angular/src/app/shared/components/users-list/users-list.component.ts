import { InputModalityDetector } from '@angular/cdk/a11y';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { ApiService } from 'src/app/core/services/api.service';
import { UserProfile } from '../../models';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit, OnChanges {
  @Input() userId: number;
  users: UserProfile[] = [];
  @Input() type: string; //Type of users list; ex: followers, following, friends...
  @Input() screenName: string;
  constructor(private apiService: ApiService) {}
  ngOnChanges(): void {
    this.apiService
      .get(`users/profile/${this.userId}/${this.type}`)
      .pipe(
        map((data) => {
          console.log(this.type);
          return data[this.type];
        })
      )
      .subscribe({
        next: (data) => {
          this.users = data;
        },
        error: (err) => {
          console.error(err.message);
        },
        complete: () => {},
      });
  }
  ngOnInit(): void {}
}
