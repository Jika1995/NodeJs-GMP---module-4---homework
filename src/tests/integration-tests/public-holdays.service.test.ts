import axios from "axios";
import { checkIfTodayIsPublicHoliday, getListOfPublicHolidays, getNextPublicHolidays } from "../../services/public-holidays.service";
import { PublicHolidayShort } from "../../types";

describe('Get list of public holidays', () => {

  test('should return an array with proper fields', async () => {
    const result: PublicHolidayShort[] = await getListOfPublicHolidays(2024, 'FR');

    expect(Array.isArray(result)).toBe(true);
    result.forEach((holiday) => {
      expect(typeof holiday.name).toBe('string');
      expect(typeof holiday.localName).toBe('string')
      expect(typeof holiday.date).toBe('string')
    })
  });

  // test('should handle server errors', async () => {
  //   mockedAxios.get.mockRejectedValueOnce({status: 500});

  //   const result = await getListOfPublicHolidays(2024, 'FR');

  //   expect(result).toEqual([]);
  // });

});

describe('Get list of next public holidays', () => {
  test('should return an array with proper fields', async () => {
    const result: PublicHolidayShort[] = await getNextPublicHolidays('FR');

    expect(Array.isArray(result)).toBe(true);
    result.forEach((holiday) => {
      expect(typeof holiday.name).toBe('string');
      expect(typeof holiday.localName).toBe('string')
      expect(typeof holiday.date).toBe('string')
    })
  });
})

describe('Check if today is public holiday', () => {

  test('should return true if it is holiday', async () => {

    const result = await checkIfTodayIsPublicHoliday('GB'); //29 mars today is holiday in Great Britain

    expect(result).toBeTruthy();
  });

  test('should return false if it is not holiday', async () => {

    const result = await checkIfTodayIsPublicHoliday('FR'); //29 mars today is not holiday in France

    expect(result).toBeFalsy();
  })
})