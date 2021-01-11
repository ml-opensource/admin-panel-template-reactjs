export type UserInfo = {
  id: number;
  color: string;
  name: string;
  pantone_value: string;
  year: number;
};

export type GetUserResponse = { data: UserInfo };
export type UpdateUserInput = Partial<Omit<UserInfo, "id">>;
export type UpdateUserResponse = Partial<UserInfo>;
