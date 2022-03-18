import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatCommonModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AgePipe } from './pipes/age.pipe';
import { GenderPipe } from './pipes/gender.pipe';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProfilePicComponent } from './components/profile-pic/profile-pic.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
@NgModule({
  declarations: [
    AgePipe,
    GenderPipe,
    UserProfileComponent,
    ProfilePicComponent,
    UsersListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatCommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatExpansionModule,
    MatListModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule,
    MatCommonModule,
    MatToolbarModule,
    AgePipe,
    GenderPipe,
    UserProfileComponent,
    ProfilePicComponent,
    UsersListComponent,
  ],
  providers: [],
})
export class SharedModule {}
