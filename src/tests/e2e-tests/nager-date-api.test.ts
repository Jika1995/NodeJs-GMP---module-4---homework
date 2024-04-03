import request from 'supertest';
import { PUBLIC_HOLIDAYS_API_URL } from '../../config';

describe('Nager Date API', () => {
  describe('/countryInfo', () => {
    it('should return 200 and country info', async () => {
      const testCountryCode = 'KG';

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/CountryInfo/${ testCountryCode }`);

      expect(status).toEqual(200);
      expect(body).toEqual({
        commonName: expect.any(String),
        officialName: expect.any(String),
        countryCode: testCountryCode,
        region: expect.any(String),
        borders: expect.any(Array),
      })
    });
  });

  describe('/longWeekend', () => {
    it('should return 200 and long Weekend info', async () => {
      const testCountryCode = 'KZ';
      const testYear = 2024;

      const { status, body } = await request(PUBLIC_HOLIDAYS_API_URL).get(`/LongWeekend/${ testYear }/${ testCountryCode }`);

      expect(status).toEqual(200);
      body.forEach((obj: any) => {
        expect(obj).toEqual({
          startDate: expect.any(String),
          endDate: expect.any(String),
          dayCount: expect.any(Number),
          needBridgeDay: expect.any(Boolean),
        })
      })
    });
  })
});
