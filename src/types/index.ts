export type User = {
  id?: string
  email: string;
  full_name: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
};

export type Vehicle = {
  plate_number: string;
  make: string;
  model: string;
  year: string;
  registration_card_number: string;
  images: any[]
};

export type SignUpForm = {
  email: string;
  full_name: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
  password?: string;
  password_confirmation?: string;
};

export type VehicleForm = {
  plate_number: string;
  make: string;
  model: string;
  year: string;
  registration_card_number: string;
  images: any[]
};
