import React from "react";
import Image from "next/image";
import mastersLogo from "@/assets/icons/sidebar/masters.svg";
import rupeeIcons from "@/assets/svg/rupee_icons.svg";
// import houseIcons from "@/assets/svg/house_icons.svg";
import { SidebarLinksProps } from "@/utils/types/types";
import project from "@/assets/svg/project.svg";
import contract from "@/assets/svg/contract.svg";
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
          roles: [
            ROLES.JUNIOR_ENGINEER,
            ROLES.ASSISTANT_ENGINEER,
            ROLES.EXECUTIVE_ENGINEER,
            ROLES.SUPERINTENDENT_ENGINEER,
            ROLES.CHIEF_ENGINEER,
            ROLES.DEPUTY_MUNICIPAL_COMMISSIONER,
            ROLES.ASSISTANT_MUNICIPAL_COMMISSIONER,
            ROLES.MUNICIPAL_COMMISSIONER,
          ],

          subModules: [
            {
              moduleName: "Projects",
              icon: (
                <Image
                  src={houseIcons}
                  alt="projects"
                  width={100}
                  height={100}
                />
              ),
              path: "/engineering/projects",
            },
            {
              moduleName: "e-Measurement Book",
              icon: (
                <Image
                  src={houseIcons}
                  alt="e-measurement"
                  width={100}
                  height={100}
                />
              ),
              path: "/engineering/e-measurement-book",
            },
            {
              moduleName: "Running Bills",
              icon: (
                <Image
                  src={houseIcons}
                  alt="running-bills"
                  width={100}
                  height={100}
                />
              ),
              path: "/engineering/running-bills",
            },
            {
              moduleName: "Schedule Of Rates",
              icon: (
                <Image
                  src={houseIcons}
                  alt="running-bills"
                  width={100}
                  height={100}
                />
              ),
              path: "/engineering/schedule-of-rates",
              roles: [ROLES.EXECUTIVE_ENGINEER],
            },
          ],
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
          roles: [],
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
          roles: [],
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
          roles: [],
        },
        {
          moduleName: "Dashboard",
          icon: (
            <Image src={mastersLogo} alt="dashboard" width={100} height={100} />
          ),
          path: "/dashboard",
          roles: [],
        },
        {
          moduleName: "Tender Datasheet",
          icon: (
            <Image src={tenderIcon} alt="tender" width={100} height={100} />
          ),
          path: "/tender-datasheet",
          roles: [
            ROLES.JUNIOR_ENGINEER,
            ROLES.EXECUTIVE_ENGINEER,
            ROLES.EXECUTIVE_OFFICER,
          ],
          subModules: [
            {
              moduleName: "Tender Input Form",
              icon: (
                <Image
                  src={mastersLogo}
                  alt="dashboard"
                  width={100}
                  height={100}
                />
              ),
              path: "/tender-datasheet",
            },
            {
              moduleName: "Awarded Tenders",
              icon: (
                <Image
                  src={mastersLogo}
                  alt="awarded"
                  width={100}
                  height={100}
                />
              ),
              path: "/tender-datasheet/awarded-tenders",
            },
          ],
        },
      ],
    },
  ],
};
