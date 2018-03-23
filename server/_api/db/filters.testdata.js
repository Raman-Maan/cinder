/**
 * Test data for the tests at filters.test.js
 */
const testUtils = require('./utils/testutils');
const refData = require('../../db/referenceData');

// keep the filters arranged by userID starting from 1
const users = [
  { userID: 1, name: 'User1', genderID: 1, bio: 'Bio1', age: 27, birthday: testUtils.calcBirthday(27), img: 'path/to/pic1' },
  { userID: 2, name: 'User2', genderID: 1, bio: 'Bio2', age: 22, birthday: testUtils.calcBirthday(22), img: 'path/to/pic2' },
  { userID: 3, name: 'User3', genderID: 1, bio: 'Bio3', age: 36, birthday: testUtils.calcBirthday(36), img: 'path/to/pic3' },
];

const filterStates = [
  { userID: 1, ageFilterState: true, genderFilterState: false },
  { userID: 2, ageFilterState: false, genderFilterState: true },
];

const ageFilters = [
  { userID: 1, minAge: 18, maxAge: 38 },
  { userID: 2, minAge: 222, maxAge: 333 },
];

const genderFilters = [
  { userID: 1, preference: [{ genderID: 1, genderName: refData.GenderType[0] }, { genderID: 2, genderName: refData.GenderType[1] }] },
  { userID: 2, preference: [{ genderID: 2, genderName: refData.GenderType[1] }] },
];

const getAgeFilterState = (id) => {
  if (filterStates[id - 1].userID != id) {
    throw Error('filters.testdata.getAgeFilterState Error'); 
  }
  return filterStates[id - 1].ageFilterState; 
}

const getGenderFilterState = (id) => {
  if (filterStates[id - 1].userID != id) {
    throw Error('filters.testdata.getGenderFilterState Error'); 
  }
  return filterStates[id - 1].genderFilterState; 
}

const getAgeFilter = (id) => {
  if (ageFilters[id - 1].userID != id) {
    throw Error('filters.testdata.getAgeFilter Error'); 
  }
  return ageFilters[id - 1]; 
}

const getGenderFilter = (id) => {
  if (genderFilters[id - 1].userID != id) {
    throw Error('filters.testdata.getGenderFilter Error'); 
  }
  return genderFilters[id - 1]; 
}

module.exports = {
  users,
  filterStates,
  ageFilters,
  genderFilters,
  getAgeFilter,
  getAgeFilterState,
  getGenderFilter,
  getGenderFilterState,
};
