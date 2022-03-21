import { HttpClient } from '@angular/common/http';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ApiService } from 'src/app/core/services/api.service';
import { Account } from 'src/app/shared/models';
@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html',
  styleUrls: ['./account-edit.component.scss'],
})
export class AccountEditComponent implements OnInit {
  @Input() currentInfo: Account;
  @Output() submit = new EventEmitter<void>();
  public newInfo: FormGroup;
  private apiRoute = 'users/profile';
  constructor(
    private titleService: Title,
    private fb: FormBuilder,
    private apiService: ApiService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Account Edit | Zone Connect');
    this.newInfo = this.fb.group({
      screenName: this.currentInfo.screenName,
      email: this.currentInfo.email,
      firstName: this.currentInfo.firstName,
      lastName: this.currentInfo.lastName,
      gender: this.currentInfo.gender,
      dateOfBirth: this.currentInfo.dateOfBirth,
      city: this.currentInfo.city,
      region: this.currentInfo.region,
      country: this.currentInfo.country,
      bio: this.currentInfo.bio,
      areaOfStudy: this.currentInfo.areaOfStudy,
      profilePic: null,
    });
  }
  uploadImage(event) {
    const img = (event.target as HTMLInputElement).files[0];
    this.newInfo.patchValue({
      profilePic: img,
    });
    this.newInfo.get('profilePic').updateValueAndValidity();
  }
  onSubmit() {
    let formData = new FormData();
    formData.append('screenName', this.newInfo.get('screenName').value);
    formData.append('email', this.newInfo.value.email);
    formData.append('firstName', this.newInfo.value.firstName);
    formData.append('lastName', this.newInfo.value.lastName);
    formData.append('gender', this.newInfo.value.gender);
    formData.append('dateOfBirth', this.newInfo.value.dateOfBirth);
    formData.append('city', this.newInfo.value.city);
    formData.append('region', this.newInfo.value.region);
    formData.append('country', this.newInfo.value.country);
    formData.append('bio', this.newInfo.value.bio);
    formData.append('areaOfStudy', this.newInfo.value.areaOfStudy);
    if (this.newInfo.value.profilePic) {
      formData.append(
        'profilePic',
        this.newInfo.value.profilePic,
        this.newInfo.value.profilePic.name
      );
    }
    this.apiService.put(this.apiRoute, formData).subscribe({
      next: (res) => {
        this.submit.emit();
      },
    });
  }
}
