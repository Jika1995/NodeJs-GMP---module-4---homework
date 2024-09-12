import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from "../../services/public-holidays.service";
import axios from 'axios';
import { shortenPublicHoliday } from "../../helpers";
import { PublicHolidayShort } from "../../types";
import { PUBLIC_HOLIDAYS_API_URL } from "../../config";

const TEST_DATA = {
  year: 2024,
  country: 'FR'
};

const HOLIDAYS_MOCK = [
  {
    date: '21.03.2024',
    localName: 'Thanksgiving day',
    name: 'test',
    countryCode: 'test',
    fixed: true,
    global: false,
    countries: ['FR'],
    launchYear: 1955,
    types: ['test']
  },
  {
    date: '21.03.2024',
    localName: 'Nooruz',
    name: 'test',
    countryCode: 'test',
    fixed: true,
    global: false,
    countries: ['FR'],
    launchYear: 1955,
    types: ['test']
  }
]

describe('Get list of public holidays', () => {
  it('should return a list of public holidays', async () => {
    //mock response from API
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: HOLIDAYS_MOCK }));

    const holidaysListResponse = await getListOfPublicHolidays(TEST_DATA.year, TEST_DATA.country);
    const shortHolidaysMock: PublicHolidayShort[] = HOLIDAYS_MOCK.map((holiday) => shortenPublicHoliday(holiday));

    expect(holidaysListResponse).toEqual(shortHolidaysMock);
  });

  it('should call API with proper arguments', async () => {
    //setup spy on axios.get() to check what args were passed to it
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: HOLIDAYS_MOCK }));

    await getListOfPublicHolidays(TEST_DATA.year, TEST_DATA.country);

    //expect that axios.get() is called with proper args
    expect(axiosGetSpy).toHaveBeenCalledWith(`${ PUBLIC_HOLIDAYS_API_URL }/PublicHolidays/${ TEST_DATA.year }/${ TEST_DATA.country }`)
  });

  it('handling server errors', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 500 }));
    const holidaysListResponse = await getListOfPublicHolidays(TEST_DATA.year, TEST_DATA.country);
    expect(holidaysListResponse).toEqual([])
  })

  afterEach(() => {
    jest.clearAllMocks()
  })
});

describe('Check if today is public holiday', () => {
  it('should call API with proper arguments', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 200 }));

    await checkIfTodayIsPublicHoliday(TEST_DATA.country);

    //expect that axios.get() is called with proper args
    expect(axiosGetSpy).toHaveBeenCalledWith(`${ PUBLIC_HOLIDAYS_API_URL }/IsTodayPublicHoliday/${ TEST_DATA.country }`)
  });

  it('handling server errors', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 500 }));
    const holidaysListResponse = await checkIfTodayIsPublicHoliday(TEST_DATA.country);
    expect(holidaysListResponse).toEqual(false)
  })
})

describe('Get next public holidays', () => {
  it('should return a list of next public holidays', async () => {
    //mock response from API
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: HOLIDAYS_MOCK }));

    const nextHolidaysResponse = await getNextPublicHolidays(TEST_DATA.country);
    const shortHolidaysMock: PublicHolidayShort[] = HOLIDAYS_MOCK.map((holiday) => shortenPublicHoliday(holiday));

    expect(nextHolidaysResponse).toEqual(shortHolidaysMock);
  });

  it('should call API with proper arguments', async () => {
    const axiosGetSpy = jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ data: HOLIDAYS_MOCK }));

    await getNextPublicHolidays(TEST_DATA.country);

    //expect that axios.get() is called with proper args
    expect(axiosGetSpy).toHaveBeenCalledWith(`${ PUBLIC_HOLIDAYS_API_URL }/NextPublicHolidays/${ TEST_DATA.country }`)
  });

  it('handling server errors', async () => {
    jest.spyOn(axios, 'get').mockImplementation(() => Promise.resolve({ status: 500 }));
    const holidaysListResponse = await getNextPublicHolidays(TEST_DATA.country);
    expect(holidaysListResponse).toEqual([])
  })
})
