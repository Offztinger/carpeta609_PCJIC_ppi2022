export type ReqUser = {
  id: string;
  role: string;
  permissions: Permission[];
};

export interface Permission {
  route: string | undefined;
  role: string | undefined;
  create: boolean;
  read: boolean;
  update: boolean;
  delete: boolean;
}