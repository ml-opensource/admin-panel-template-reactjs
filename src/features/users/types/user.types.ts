export type UserInfo = {
  id: number;
  color: string;
  name: string;
  pantone_value: string;
  year: number;
};

export type UpdateUserInput = Partial<Omit<UserInfo, "id">>;

export type UpdateUserResponse = Partial<UserInfo>;
