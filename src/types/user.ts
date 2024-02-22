export interface SignupData {
  userId: string;
  password: string;
}

export interface ProfileData {
  _id: string;
  socialProvider: string;
  avatar: string;
  userId: string;
  nickname: string;
  introduction: string;
  email: string;
  password: string;
  createdAt: Date;
}
