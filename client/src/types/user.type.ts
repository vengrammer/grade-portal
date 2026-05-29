
export interface UserPayload {
  account_number: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  address: string;
  birth_date: string;
  contact_number: string;
  email: string;
  password: string;
  confirm_password: string;
  profile_picture?: string;
  role: string;
}

export type UserType = {
  _id: string;
  account_number: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  gender: string;
  address: string;
  birth_date: string;
  contact_number: string;
  email: string;
  is_active: boolean;
  profile_picture?: string;
  createdAt: string;
  updatedAt: string;
}