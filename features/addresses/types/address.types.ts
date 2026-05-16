export interface Address {
  _id: string;
  name: string;
  details: string;
  phone: string;
  city: string;
}

export interface AddressesResponse {
  status: string;
  data: Address[];
}

export interface AddAddressBody {
  name: string;
  details: string;
  phone: string;
  city: string;
}
