export type UserInfo = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
};

export type UpdateUserInput = Partial<Omit<UserInfo, "id">>;
