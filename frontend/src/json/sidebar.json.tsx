import React from "react";
import Image from "next/image";
import mastersLogo from "@/assets/icons/sidebar/masters.svg";
import rupeeIcons from "@/assets/svg/rupee_icons.svg";
import houseIcons from "@/assets/svg/house_icons.svg";
import { SidebarLinksProps } from "@/utils/types/types";
import project from "@/assets/svg/project.svg";
import contract from "@/assets/svg/contract.svg";
import technical from "@/assets/svg/technical.svg";
import measure from "@/assets/svg/measure.svg";
import running from "@/assets/svg/running.svg";
import userAdmin from "@/assets/svg/userAdmin.svg";

export const sidebarLinks: SidebarLinksProps = {
  modules: [
    {
      moduleName: "PFMS",
      path: "/",
      icon: <Image src={rupeeIcons} alt="finance" width={100} height={100} />,
      subModules: [
        {
          moduleName: "Home",
          icon: <Image src={houseIcons} alt="home" width={100} height={100} />,
          path: "/home",
        },
        {
          moduleName: "Project Management",
          icon: <Image src={project} alt="home" width={100} height={100} />,
          path: "/project-management",
        },
        {
          moduleName: "Fund Management",
          icon: (
            <Image
              src={project}
              alt="fund-management"
              width={100}
              height={100}
            />
          ),
          path: "/fund-management",
        //   roles: [ROLES.ACC_DEP_MANAGER, ROLES.ACC_DEP_ACCOUNTANT, ROLES.PROJECT_DIR_FINANCE],
        },
        {
          moduleName: "Contract Management",
          icon: (
            <Image
              src={contract}
              alt="contract-management"
              width={100}
              height={100}
            />
          ),
          path: "/contract-management",
        //   roles: [ROLES.ACC_DEP_MANAGER, ROLES.ACC_DEP_ACCOUNTANT, ROLES.PROJECT_DIR_FINANCE],
        },
        {
          moduleName: "Engineering Section",
          icon: <Image src={technical} alt="engineering-section" width={100} height={100} />,
          path: "/engineering-section",
        //   roles: [ROLES.ACC_DEP_MANAGER, ROLES.ACC_DEP_ACCOUNTANT, ROLES.PROJECT_DIR_FINANCE],
          subModules: [
            {
              moduleName: "Technical Section",
              path: "/engineering-section/technical-section",
            },
          ],
        },
        {
          moduleName: "E-Measurement",
          icon: (
            <Image src={measure} alt="e-measurement" width={100} height={100} />
          ),
          path: "/e-measurement",
        //   roles: [ROLES.ACC_DEP_MANAGER, ROLES.ACC_DEP_ACCOUNTANT, ROLES.PROJECT_DIR_FINANCE],
        },
        {
          moduleName: "Running Bills",
          icon: (
            <Image src={running} alt="running-bills" width={100} height={100} />
          ),
          path: "/running-bills",
        //   roles: [ROLES.ACC_DEP_MANAGER, ROLES.ACC_DEP_ACCOUNTANT, ROLES.PROJECT_DIR_FINANCE],
        },
        {
          moduleName: "Adminstrative Section",
          icon: (
            <Image
              src={userAdmin}
              alt="adminstrative"
              width={100}
              height={100}
            />
          ),
          path: "/adminstrative-section",
        //   roles: [ROLES.ACC_DEP_MANAGER, ROLES.ACC_DEP_ACCOUNTANT, ROLES.PROJECT_DIR_FINANCE],
        },
        {
          moduleName: "Dashboard",
          icon: (
            <Image src={mastersLogo} alt="dashboard" width={100} height={100} />
          ),
          path: "/dashboard",
        },
      ],
    },
  ],
};

