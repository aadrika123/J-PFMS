import { describe, expect, it } from '@jest/globals';
import app from '../../src/app';
const supertest = require("supertest");

const request = supertest(app);


describe('bank apis', () => {
    it('Gets bank list', (done: (()=>void)) => {
        const response = request
        .get("/api/v1/finance/banks/get")
        .expect(200, (err, res) => {
            const data = res.body.data;
            expect(Object.keys(data[0])).toContain('id');
            expect(Object.keys(data[0])).toContain('name');   
            done();
        });
    });
});