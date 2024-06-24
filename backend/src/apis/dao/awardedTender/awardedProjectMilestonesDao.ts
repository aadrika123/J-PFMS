/**
 * | Author- Sanjiv Kumar
 * | Created On- 23-06-2024
 * | Status- open
 * | Created For- Awarded Project Milestones
 */

import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { awardedTenderValidation } from "pfmslib";

const prisma = new PrismaClient();

class AwardedProjectMilestonesDao {
  /* Create ro Update Awarded Project Milestones */
  async create(data: awardedTenderValidation.awardedMilestoneType) {
    const dbData = {
      awarded_tender_id: data.awarded_tender_id,
      milestones: data.milestones,
    };

    const res = await prisma.$transaction(async (tx) => {
      ///// Getting all existing list ///
      const existingMilestones = await tx.awarded_project_milestones.findMany({
        where: {
          awarded_tender_id: dbData.awarded_tender_id,
        },
        select: {
          id: true,
        },
      });

      const toBeDeleted: number[] = [];
      const toBeUpdated: any[] = [];
      const toBeCreated: any[] = [];

      /////// Extracting Data That will going to updated, deleted and created /////
      if (existingMilestones.length) {
        const milestones = dbData.milestones;
        const existingIds = new Set(
          existingMilestones.map((milestone) => milestone.id)
        );
        milestones.forEach((milestone) => {
          if (!milestone.id) {
            toBeCreated.push({
              awarded_tender_id: dbData.awarded_tender_id,
              amount: milestone.amount,
              start_date: milestone.start_date,
              end_date: milestone.end_date,
              percentage: milestone.percentage,
            });
          } else if (existingIds.has(milestone.id)) {
            toBeUpdated.push(milestone);
            existingIds.delete(milestone.id);
          }
        });

        toBeDeleted.push(...existingIds);
      }

      /////// Deleting milestones /////
      if (toBeDeleted.length) {
        await tx.awarded_project_milestones.deleteMany({
          where: {
            id: { in: Array.from(toBeDeleted) },
          },
        });
      }

      /////// Creating milestones /////
      if (toBeCreated.length) {
        await tx.awarded_project_milestones.createMany({
          data: toBeCreated,
        });
      }

      /////// Updating milestones /////
      if (toBeUpdated.length) {
        for (const item of toBeUpdated) {
          await tx.awarded_project_milestones.update({
            where: {
              id: item.id,
            },
            data: {
              amount: item.amount,
              start_date: item.start_date,
              end_date: item.end_date,
              percentage: item.percentage,
            },
          });
        }
      }

      return {
        count: toBeCreated.length + toBeDeleted.length + toBeUpdated.length,
      };
    });

    return generateRes(res);
  }

  /* Get Awarded Project Milestone By Awarded Tender Id */
  async getByAwardedTenderId(id: number) {
    /* Getting Milestones */
    const res: any = await prisma.awarded_project_milestones.findMany({
      where: {
        awarded_tender_id: id,
      },
      select: {
        id: true,
        awarded_tender_id: true,
        start_date: true,
        end_date: true,
        amount: true,
        percentage: true,
      },
    });

    return generateRes(res);
  }
}

export default AwardedProjectMilestonesDao;
