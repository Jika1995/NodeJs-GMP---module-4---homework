import { validateInput, shortenPublicHoliday } from '../../helpers';

const testData = {
  year: 2024,
  country: 'FR'
};

const testPublicHoliday = {
  date: '21.03.2024',
  localName: 'Thanksgiving day',
  name: 'test',
  countryCode: 'test',
  fixed: true,
  global: false,
  countries: ['FR'],
  launchYear: 1955,
  types: ['test']
};

describe('test validateInput function', () => {
  test('shoud return true if data is correct', () => {
    expect(validateInput(testData)).toBeTruthy();
  });

  test('shoud return error if year is not current', () => {
    testData.year = 2020;
    expect(validateInput(testData)).toThrow(new Error(`Year provided not the current, received: ${ testData.year }`));
  });

  test('should return error if the country is not supported', () => {
    testData.country = 'KG';
    expect(validateInput(testData)).toThrow(`Country provided is not supported, received: ${ testData.country }`)
  });
});

describe('test shortenPublicHoliday function', () => {
  test('should return correct shorten info', () => {
    expect(shortenPublicHoliday(testPublicHoliday)).toEqual(
      {
        name: testPublicHoliday.name,
        localName: testPublicHoliday.localName,
        date: testPublicHoliday.date
      })
  })
})


