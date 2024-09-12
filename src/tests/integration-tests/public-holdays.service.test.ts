import axios from "axios";
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../../services/public-holidays.service";
import { PublicHolidayShort } from "../../types";

const testCountryCode = 'FR';

describe('Get list of public holidays', () => {

  it('should return an array with proper fields', async () => {
    const result: PublicHolidayShort[] = await getListOfPublicHolidays(2024, testCountryCode);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((holiday) => {
      expect(typeof holiday.name).toBe('string');
      expect(typeof holiday.localName).toBe('string')
      expect(typeof holiday.date).toBe('string')
    })
  });
});

describe('Get list of next public holidays', () => {
  it('should return an array with proper fields', async () => {
    const result: PublicHolidayShort[] = await getNextPublicHolidays(testCountryCode);

    expect(Array.isArray(result)).toBe(true);
    result.forEach((holiday) => {
      expect(typeof holiday.name).toBe('string');
      expect(typeof holiday.localName).toBe('string')
      expect(typeof holiday.date).toBe('string')
    })
  });
})

describe('Check if today is public holiday', () => {

  it('should return true if it is holiday', async () => {

    const result = await checkIfTodayIsPublicHoliday('GB'); //29 mars today is holiday in Great Britain

    expect(result).toBeTruthy();
  });

  it('should return false if it is not holiday', async () => {

    const result = await checkIfTodayIsPublicHoliday(testCountryCode); //29 mars today is not holiday in France

    expect(result).toBeFalsy();
  })
})