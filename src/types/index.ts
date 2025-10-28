export type User = {
  id?: string
  email: string;
  full_name: string;
  phone_number: string;
  whatsapp_number: string;
  address: string;
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
