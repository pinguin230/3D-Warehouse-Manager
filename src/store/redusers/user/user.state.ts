export type ProfileT = {
  uid?: string
  email?: string
  profileImageUrl?: string
  name: string
  phoneNumber?: string
  address?: string
  referralLink?: string
  telegram?: string
  twoAuth?: boolean
}

export const initialState: ProfileT = {
  uid: localStorage.getItem('uid'),
  email: "",
  profileImageUrl: "",
  name: "",
  phoneNumber: "",
  address: "",
  referralLink: "",
  telegram: "",
  twoAuth: false,
}
