export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image: string;
}

export interface GetAllUsersAPIResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: User[];
}

export interface CreateUserPayload {
  first_name: string;
  last_name: string;
  email: string;
}

export interface UpdatePayload {
  first_name: string;
  username: string;
}
