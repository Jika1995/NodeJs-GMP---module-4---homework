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
  it('shoud return true if data is correct', () => {
    expect(validateInput(testData)).toBeTruthy();
  });

  it('shoud return error if year is not current', () => {
    const localTestData = {
      ...testData,
      year: 2020,
    }
    expect(() => validateInput(localTestData)).toThrow(new Error(`Year provided not the current, received: ${ localTestData.year }`));
  });

  it('should return error if the country is not supported', () => {
    const localTestData = {
      ...testData,
      country: 'KG',
    }
    expect(() => validateInput(localTestData)).toThrow(`Country provided is not supported, received: ${ localTestData.country }`)
  });
});

describe('test shortenPublicHoliday function', () => {
  it('should return correct shorten info', () => {
    expect(shortenPublicHoliday(testPublicHoliday)).toEqual(
      {
        name: testPublicHoliday.name,
        localName: testPublicHoliday.localName,
        date: testPublicHoliday.date
      })
  })
})


