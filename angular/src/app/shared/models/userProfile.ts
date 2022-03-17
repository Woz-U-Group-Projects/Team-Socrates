export class UserProfile {
  userId!: number;
  screenName!: string;
  email?: string;
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
  admin?: boolean;
}
