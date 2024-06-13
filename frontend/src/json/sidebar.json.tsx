import React from "react";
import Image from "next/image";
import mastersLogo from "@/assets/icons/sidebar/masters.svg";
import rupeeIcons from "@/assets/svg/rupee_icons.svg";
// import houseIcons from "@/assets/svg/house_icons.svg";
import { SidebarLinksProps } from "@/utils/types/types";
import project from "@/assets/svg/project.svg";
import contract from "@/assets/svg/contract.svg";
import technical from "@/assets/svg/technical.svg";
import measure from "@/assets/svg/measure.svg";
import running from "@/assets/svg/running.svg";
import userAdmin from "@/assets/svg/userAdmin.svg";
import houseIcons from "@/assets/svg/house_icons.svg";
import tenderIcon from "@/assets/svg/tender.svg";

import { ROLES } from "pfmslib";

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
          moduleName: "Project Proposal",
          icon: <Image src={project} alt="home" width={100} height={100} />,
          path: "/project-proposal",
          roles: [ROLES.BACK_OFFICE],
        },
        {
          moduleName: "Engineering Section",
          icon: <Image src={project} alt="home" width={100} height={100} />,
          path: "/engineering",
          roles: [ROLES.JUNIOR_ENGINEER, ROLES.ASSISTANT_ENGINEER],

          subModules: [
            {
              moduleName: "Projects",
              icon: <Image src={houseIcons} alt="projects" width={100} height={100} />,
              path: "/engineering/projects",
            },
            {
              moduleName: "e-Measurement Book",
              icon: <Image src={houseIcons} alt="e-measurement" width={100} height={100} />,
              path: "/engineering/e-measurement-book",
            },
            {
              moduleName: "Running Bills",
              icon: <Image src={houseIcons} alt="running-bills" width={100} height={100} />,
              path: "/engineering/running-bills",
            },
            {
              moduleName: "Schedule Of Rates",
              icon: <Image src={houseIcons} alt="running-bills" width={100} height={100} />,
              path: "/engineering/schedule-of-rates",
          roles: [ROLES.EXE_OFFICER, ROLES.CITY_MANAGER],
            },         
          ]
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
          roles: [ROLES.CITY_MANAGER]
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
          roles: [ROLES.CITY_MANAGER]
        },
        {
          moduleName: "Engineering Section",
          icon: <Image src={technical} alt="engineering-section" width={100} height={100} />,
          path: "/engineering-section",
          roles: [ROLES.CITY_MANAGER]
        },
        {
          moduleName: "e-Measurement",
          icon: (
            <Image src={measure} alt="e-measurement" width={100} height={100} />
          ),
          path: "/e-measurement",
          roles: [ROLES.CITY_MANAGER]
        },
        {
          moduleName: "Running Bills",
          icon: (
            <Image src={running} alt="running-bills" width={100} height={100} />
          ),
          path: "/running-bills",
          roles: [ROLES.CITY_MANAGER]
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
          roles: [ROLES.CITY_MANAGER]
        },
        {
          moduleName: "Dashboard",
          icon: (
            <Image src={mastersLogo} alt="dashboard" width={100} height={100} />
          ),
          path: "/dashboard",
          roles: [ROLES.CITY_MANAGER]
        },
        {
          moduleName: "Tender Datasheet",
          icon: (
            <Image src={tenderIcon} alt="tender" width={100} height={100} />
          ),
          path: "/tender-datasheet",
          roles: [ROLES.JUNIOR_ENGINEER, ROLES.EXE_OFFICER]
        },
      ],
    },
  ],
};

