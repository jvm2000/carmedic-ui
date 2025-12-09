export type User = {
  id?: string
  email: string;
  full_name: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
};

export type Vehicle = {
  id?: string
  plate_number: string;
  make: string;
  model: string;
  year: string;
  registration_card_number: string;
  images: any[]
};

export type Appointment = {
  vehicle_id: string;
  scheduled_date: string;
  scheduled_time: string;
  additional_notes: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}

export type UserForm = {
  email: string;
  full_name: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
}

export type SignUpForm = {
  email: string;
  full_name: string;
  phone_number: string;
  whatsapp_number: string;
  state: string,
  city: string,
  postal_code: string,
  street_adress: string
  address?: string;
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

export type AppointmentForm = {
  vehicle_id?: string;
  scheduled_date?: string;
  scheduled_time: string;
  additional_notes: string;
  status?: 'pending' | 'confirmed' | 'completed' | 'cancelled';
}
