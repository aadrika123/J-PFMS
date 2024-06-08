import { ProjectProposalStages } from "../standard/project_proposal_stages";

function formatString(inputString: string) {
  return inputString?.replace(/([A-Z])/g, ' $1').trim();
}

export const ROLES = Object.freeze({
  BACK_OFFICE: "BACK OFFICE",
    JUNIOR_ENGINEER: "JUNIOR ENGINEER",
    ASSISTANT_ENGINEER: "ASSISTANT ENGINEER",
    EXECUTIVE_ENGINEER: "EXECUTIVE ENGINEER",
    SUPERINTENDENT_ENGINEER: "SUPERINTENDENT ENGINEER",
    CHIEF_ENGINEER: "CHIEF ENGINEER",
    DEPUTY_MUNICIPAL_COMMISSIONER: "DEPUTY MUNICIPAL COMMISSIONER",
    ASSISTANT_MUNICIPAL_COMMISSIONER: "ASSISTANT MUNICIPAL COMMISSIONER",
    MUNICIPAL_COMMISSIONER: "MUNICIPAL COMMISSIONER"
});
  
class User {
  private user: any
  constructor(userData: any) {
    this.user = userData;
  }

  isBackOffice = () => {
    return this.user?.role?.includes(ROLES.BACK_OFFICE);
  }

  isJuniorEngineer = () => {
    return this.user?.role?.includes(ROLES.JUNIOR_ENGINEER);
  }
  
  isAssistantEngineer = () => {
    return this.user?.role?.includes(ROLES.ASSISTANT_ENGINEER);
  }


  // isExecutiveOfficer = () => {
  //   return this.user?.role?.includes(ROLES.EXE_OFFICER);
  // }

  // isCityManager = () => {
  //   return this.user?.role?.includes(ROLES.CITY_MANAGER);
  // }

  // getUserLevel = () => {
  //   if (this.user?.role?.includes(ROLES.BACK_OFFICE)) return 1;
  //   if (this.user?.role?.includes(ROLES.EXE_OFFICER)) return 2;
  //   if (this.user?.role?.includes(ROLES.CITY_MANAGER)) return 3;
  // };

  getUserId = () => {
    return this.user.id;
  }

  getRole = () => {
    return this.user?.role; 
  }

  getRoles = () => {
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

  getDepartment = () =>{
    return this.user.department
  }
}

export default User;
