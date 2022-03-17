export class Account {
  userId!: number;
  username!: string;
  email!: string;
  screenName!: string;
  profilePic?: string | null;
  firstName?: string;
  lastName?: string;
  gender?: string;
  dateOfBirth?: Date;
  city?: string;
  region?: string;
  country?: string;
  bio?: string;
  areaOfStudy?: string;
}
