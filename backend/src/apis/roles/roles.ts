
export enum RoleCheckResult {
  INVALID,
  NO,
  YES
}


const extractRole = (auth: any): any[] | null => {
  const role: any = auth.role;
  if (
    role !== "" &&
    role !== undefined &&
    Array.isArray(role) &&
    role.length > 0
  ){
    return role;
  }
  return null;
}


export const checkProjectManager = (auth: any) : RoleCheckResult => {
  const role = extractRole(auth);

  if (role) {
    if (!role.includes("PROJECT MANAGER")) return RoleCheckResult.NO;
    return RoleCheckResult.YES;
  }
  return RoleCheckResult.INVALID;
}
