const request = require('supertest');
let server;

describe('/genres', () => {
  beforeEach(() => server = require('../../index'));
  afterEach(() => server.close());

  describe('GET /', () => {
    it('should return all genres', async () => {
      const res = await request(server).get('genres');
      console.log(res);
      expect(res.status).toBe(200);
    });
  });
});
