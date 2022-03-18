import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-profile-pic',
  templateUrl: './profile-pic.component.html',
  styleUrls: ['./profile-pic.component.scss'],
})
export class ProfilePicComponent implements OnInit, OnChanges {
  @Input() public imageSize: string | null; // nullish (normal size), 'thumb' , 'normal'
  @Input() public profilePicName: string | null;
  public imageURL: string;
  constructor() {}
  ngOnChanges(changes: SimpleChanges): void {
    console.log('profile pic: ' + this.profilePicName);
    console.log('size: ' + this.imageSize);
    if (!this.profilePicName) {
      this.imageURL = `http://localhost:3001/images/${
        this.imageSize + '/' || ''
      }default.png`;
    } else {
      this.imageURL = `http://localhost:3001/images/${
        this.imageSize + '/' || ''
      }${this.profilePicName}`;
    }
  }
  ngOnInit(): void {}
}
