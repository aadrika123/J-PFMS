import { describe, expect, it } from '@jest/globals';
import app from '../../src/app';
const supertest = require("supertest");

const request = supertest(app);


describe('accounting code apis', () => {
    it('Gets code list', async () => {
        const response = await request.get("/api/v1/finance/get-all-account-code",);
    
        
        expect(response.status).toBe(200);

        expect(response.body.data.length).toBeGreaterThan(0);

        const keys = Object.keys(response.body.data[0]);
        
        
        expect(keys).toContain('id');
        expect(keys).toContain('code');
        expect(keys).toContain('description'); 
    });

    
});