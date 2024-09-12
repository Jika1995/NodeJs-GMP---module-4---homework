import { getListOfPublicHolidays, checkIfTodayIsPublicHoliday, getNextPublicHolidays } from "../../services/public-holidays.service";
import axios from 'axios';
import { shortenPublicHoliday } from "../../helpers";
import { PublicHolidayShort } from "../../types";
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

jest.mock('axios');

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Get list of public holidays', () => {
  it('should return a list of public holidays', async () => {
    mockedAxios.get.mockResolvedValue({ data: HOLIDAYS_MOCK });

    const holidaysListResponse = await getListOfPublicHolidays(TEST_DATA.year, TEST_DATA.country);
    const shortHolidaysMock: PublicHolidayShort[] = HOLIDAYS_MOCK.map((holiday) => shortenPublicHoliday(holiday));

    expect(holidaysListResponse).toEqual(shortHolidaysMock);

  });

  afterEach(() => {
    //clear all Mocks to be sure that they won't be passed to any tests of this file
    jest.clearAllMocks();
  })
})