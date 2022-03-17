import { Component, Input, OnInit, Output } from '@angular/core';
import { UserProfile } from '../../models';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input()
  @Output()
  profile: UserProfile;
  @Output()
  size: 'normal';
  constructor() {}

  ngOnInit(): void {}
}
