import { describe, it } from '@jest/globals';
import BalanceTrackingsDao from '../../src/apis/dao/budgeting/BalanceTrackingsDao';

describe('balance trackings dao', () => {
    it('Record transaction', (done: (()=>void)) => {
        const balanceTrackingsDao = new BalanceTrackingsDao();
        balanceTrackingsDao.updateBalances(1, 11, 50000).then(() =>{
            done();
        })
    });
});