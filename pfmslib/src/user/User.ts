import { ProjectProposalStages } from "../standard/project_proposal_stages";

function formatString(inputString: string) {
  return inputString?.replace(/([A-Z])/g, ' $1').trim();
}

export const ROLES = Object.freeze({
  JUNIOR_ENGINEER: "Junior Engineer",
  ASSISTANT_ENGINEER: "Assistant Engineer",
  EXE_ENGINEER: "Executive Engineer",
  EXE_OFFICER_AMC: "Executive Officer - AMC",
  INTERNAL_AUDITOR: "Internal Auditor",
  ACC_DEP_PDF : "Accounts Department - PDF",
  ACC_DEP_MANAGER: "Accounts Department - Manager", ///// Accounts Department – Manager   and Accounts Department - Manager     is not same So Please Copy it from database
  ACC_DEP_ACCOUNTANT: "Accounts Department - Accountant",
  PROJECT_DIR_FINANCE: "Project Director Finance",
});

class User {
  private user: any;
  constructor(userData: any) {
    this.user = userData;
  }

  isAccDepAccountant = () => {
    return this.user?.role?.includes(ROLES.ACC_DEP_ACCOUNTANT);
  };

  isAccDepManager = () => {
    return this.user?.role?.includes(ROLES.ACC_DEP_MANAGER);
  };

  isProjectDirectorFinance = () => {
    return this.user?.role?.includes(ROLES.PROJECT_DIR_FINANCE);
  };

  isJuniorEngineer = () => {
    return this.user?.role?.includes(ROLES.JUNIOR_ENGINEER);
  };

  isAssistantEngineer = () => {
    return this.user?.role?.includes(ROLES.ASSISTANT_ENGINEER);
  }

  isExecutiveEngineer = () => {
    return this.user?.role?.includes(ROLES.EXE_ENGINEER);
  }

  isExecutiveOfficer1 = () => {
    return this.user?.role?.includes(ROLES.EXE_OFFICER_AMC);
  }

  isExecutiveOfficer2 = () => {
    return this.user?.role?.includes(ROLES.EXE_OFFICER_AMC);
  }

  isExecutiveOfficer3 = () => {
    return this.user?.role?.includes(ROLES.EXE_OFFICER_AMC);
  }

  isInternalAuditor = () => {
    return this.user?.role?.includes(ROLES.INTERNAL_AUDITOR);
  }

  isAccDepPdf= () => {
    return this.user?.role?.includes(ROLES.ACC_DEP_PDF);
  }
  
  getUserLevel = () => {
    if (this.user?.role?.includes(ROLES.JUNIOR_ENGINEER)) return 1;
    if (this.user?.role?.includes(ROLES.ASSISTANT_ENGINEER)) return 2;
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
}

export default User;
