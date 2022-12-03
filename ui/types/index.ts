export type AuthForm = {
  email: string;
  password: string;
};

export type EditedTask = {
  id: string;
  title: string;
  description: string | null;
};
