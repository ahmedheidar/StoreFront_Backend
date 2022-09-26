import supertest from 'supertest';
import app from '../../server';

const request = supertest(app);

describe("Test endpoint responses", () => {

    // var originalTimeout:number;

    // beforeEach(function() {
    //     originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
    //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    // });

    // afterEach(function() {
    //   jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    // });

    
    it("gets the api endpoint", async (done) => {
        const response = await request.get("/api");
        expect(response.status).toBe(200);
        done()
    });
});