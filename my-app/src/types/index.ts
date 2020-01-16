// src/types/index.tsx
export interface User {
  id: number,
  name: string,
  cpf: string,
  birthDate: string,
  email: string,
  role: string
}

export enum UserRoleType{
  admin,
  user
}

export interface UserInputType {
  id: number,
  name: string,
  cpf: string,
  birthDate: string,
  email: string,
  password: string,
  role: UserRoleType
}

export interface PageInfoType{
  hasNextPage: boolean,
  hasPreviousPage: boolean
}

export interface UsersConnectionType {
  count: number,
  nodes: User[],
  pageInfo: PageInfoType
}
