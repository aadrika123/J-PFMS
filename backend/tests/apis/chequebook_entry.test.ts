import { describe, expect, it } from '@jest/globals';
import app from '../../src/app';
const supertest = require("supertest");

const request = supertest(app);


describe('chequebook entry', () => {

    it('gets chequebook list', async () => {
        const response = await request
        .get("/api/v1/finance/chequebook-entry/get")
        .query({
            page: 1,
            limit: 10
        });
    
        
        expect(response.status).toBe(200);


        const firstRecord = response.body.data.data[0];
        const keys = Object.keys(firstRecord);
        
        expect(keys).toContain('id');
        expect(keys).toContain('date');
        expect(keys).toContain('bank'); 
    });


    it('searches chequebook list', async () => {
        const response = await request
        .get("/api/v1/finance/chequebook-entry/get")
        .query({
            page: 1,
            limit: 10,
            search: "e"
        });
        
        expect(response.status).toBe(200);
    });


    it('gets single chequebook', async () => {

        const response1 = await request
        .get("/api/v1/finance/chequebook-entry/get")
        .query({
            page: 1,
            limit: 1
        });
    
        const firstRecord = response1.body.data.data[0];
        
        const response = await request
        .get(`/api/v1/finance/chequebook-entry/get/${firstRecord.id}`);
        expect(response.status).toBe(200);


        const record = response.body.data;
        const keys = Object.keys(record);

        expect(keys).toContain('id');
        expect(keys).toContain('date');
        expect(keys).toContain('bank'); 

    })

    it('adds new chequebook', async () => {
        const response = await request
        .post(`/api/v1/finance/chequebook-entry/create`)
        .send({
            date: new Date().toISOString(),
            issuer_name: "Sachin Tendulkar",
            bank_id: 1,
            bank_account_no: 'SBIN32432434FSD',
            cheque_no_from: '32342423234',
            cheque_no_to: '33243243242342',
            employee_id: 1,
            bank_branch: "chutiya, ranchi",
            page_count: 1,
        });

        expect(response.status).toBe(200);
    })

    it('updates new chequebook', async () => {

        const response1 = await request
        .get("/api/v1/finance/chequebook-entry/get")
        .query({
            page: 1,
            limit: 1
        });
    
        const firstRecord = response1.body.data.data[0];
        const record = {
            ...firstRecord,
            bank_id: firstRecord.bank.id,
            employee_id: firstRecord.employee.id
        };
        delete record.bank;
        delete record.employee;
        delete record.cheque_book_return;
        delete record.cheque_book_return_date;
        delete record.created_at;
        delete record.updated_at;
        

        const response = await request
        .post(`/api/v1/finance/chequebook-entry/update`)
        .send(record);

        // console.log(response.body);
        expect(response.status).toBe(200);
    })
});