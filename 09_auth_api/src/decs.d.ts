type User = {
  email: string;
  password: string;
};

declare namespace Express {
  interface Request {
      user?: User;
  }
}