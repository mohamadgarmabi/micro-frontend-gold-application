type AuthCredentials = {
  phone: string
  countryCode: string
}

type AuthContext = {
  token: string | null
  isAuthenticated: boolean
}

type AuthSearchParams = {
  redirect: string
}

export type { AuthContext, AuthCredentials, AuthSearchParams }
