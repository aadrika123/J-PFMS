import { ProjectProposalStages } from "../standard/project_proposal_stages";

function formatString(inputString: string) {
  return inputString?.replace(/([A-Z])/g, ' $1').trim();
}

export const ROLES = Object.freeze({
  BACK_OFFICE: "BACK OFFICE",
  EXE_OFFICER: "EXECUTIVE OFFICER",
  CITY_MANAGER: "City Manager",
});

class User {
  private user: any
  constructor(userData: any) {
    this.user = userData;
  }

  isBackOffice = () => {
    return this.user?.role?.includes(ROLES.BACK_OFFICE);
  }

  isExecutiveOfficer = () => {
    return this.user?.role?.includes(ROLES.EXE_OFFICER);
  }

  isCityManager = () => {
    return this.user?.role?.includes(ROLES.CITY_MANAGER);
  }

  getUserLevel = () => {
    if (this.user?.role?.includes(ROLES.BACK_OFFICE)) return 1;
    if (this.user?.role?.includes(ROLES.EXE_OFFICER)) return 2;
    if (this.user?.role?.includes(ROLES.CITY_MANAGER)) return 3;
  };

  getUserId = () => {
    return this.user.id;
  }

  getRole = () => {
    return this.user?.role; 
  }

  getProjectProposalStage = (stageId: number) => {
    return formatString(Object.keys(ProjectProposalStages).find(key => ProjectProposalStages[key] === stageId))?.split("By ")[1]
  }

  getUlbId = () => {
    return this.user.ulb_id
  }

  isUserAdmin = () => {
    return this.user?.user_type === "Admin"
  }

  getDistrict = () => {
    return this.user.district
  }

  getState = () => {
    return this.user.state
  }

  getUlb = () => {
    return this.user.ulb
  }

  getDepartmentId = () =>{
    return this.user.department
  }
}

export default User;
