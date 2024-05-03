import { PrismaClient } from "@prisma/client";
import { generateRes } from "../../../util/generateRes";
import { getCurrFinancialYear } from "../../../util/helper/getCurrentFinancialYear";

const prisma = new PrismaClient();

class DashboardDao {
  getCollection = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const currentAmount: any[] = (await prisma.$queryRaw`
    SELECT
        SUM(cbrv.amount) AS currentAmount
    FROM
        cash_bank_receipt_vouchers AS cbrv
    WHERE
        cbrv.voucher_date::date BETWEEN ${startDate}::date AND ${endDate}::date`) as any[];

    const arrearAmount: any[] = await prisma.$queryRaw`
     SELECT
        SUM(cbrv1.amount) AS arrearAmount
    FROM
        cash_bank_receipt_vouchers AS cbrv1
    WHERE
        cbrv1.voucher_date::date < ${startDate}::date
    `;

    const data = {
        currentAmount: currentAmount[0]?.currentAmount || 0,
        arrearAmount: arrearAmount[0]?.arrearAmount || 0,
    };

    return generateRes(data);
  };

  getTopRevenuModules = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const revenueModules: any[] = await prisma.$queryRaw`
    select sum(rr.bank_amount + rr.cash_amount) as amount, rm.name
    from receipt_registers as rr 
    left join
    revenue_modules as rm on rm.id = rr.revenue_module_id
    where rr.receipt_date::date between ${startDate}::date and ${endDate}::date
    group by rm.name
    order by
    amount desc
    limit 6
   `;

    return generateRes(revenueModules);
  };

  getTopUlbs = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const ulbs: any[] = await prisma.$queryRaw`
    select sum(rr.bank_amount + rr.cash_amount) as amount, mc.ulbs as name
    from receipt_registers as rr 
    left join
    municipality_codes as mc on mc.id = rr.ulb_id
    where rr.receipt_date::date between ${startDate}::date and ${endDate}::date
    group by mc.ulbs
    order by
    amount desc
    limit 6
   `;

    return generateRes(ulbs);
  };

  getTopPaymentMode = async () => {
    const { startDate, endDate } = getCurrFinancialYear();

    const paymentModes: any[] = await prisma.$queryRaw`
    select sum(rr.bank_amount + rr.cash_amount) as amount, rm.name
    from receipt_registers as rr 
    left join
    receipt_modes as rm on rm.id = rr.receipt_mode_id
    where rr.receipt_date::date between ${startDate}::date and ${endDate}::date
    group by rm.name
    order by
    amount desc
    limit 6
   `;

    return generateRes(paymentModes);
  };
}

export default DashboardDao;
