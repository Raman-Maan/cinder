/**
 * Test data for the tests at matches.test.js
 */
const testUtils = require('./utils/testutils');

// data must be kept ordered by userID starting from 1
const users = [
  {
    userID: 1,
    userName: 'User1',
    genderID: 1,
    userBio: 'Bio1',
    userAge: 27,
    birthday: testUtils.calcBirthday(27),
    primaryPic: 'path/to/pic1'
  },
  {
    userID: 2,
    userName: 'User2',
    genderID: 1,
    userBio: 'Bio2',
    userAge: 22,
    birthday: testUtils.calcBirthday(22),
    primaryPic: 'path/to/pic2'
  },
  {
    userID: 3,
    userName: 'User3',
    genderID: 1,
    userBio: 'Bio3',
    userAge: 36,
    birthday: testUtils.calcBirthday(36),
    primaryPic: 'path/to/pic3'
  },
  {
    userID: 4,
    userName: 'User4',
    genderID: 2,
    userBio: 'Bio4',
    userAge: 20,
    birthday: testUtils.calcBirthday(20),
    primaryPic: 'path/to/pic4'
  },
  {
    userID: 5,
    userName: 'User5',
    genderID: 2,
    userBio: 'Bio5',
    userAge: 44,
    birthday: testUtils.calcBirthday(44),
    primaryPic: 'path/to/pic5'
  },
  {
    userID: 6,
    userName: 'User6',
    genderID: 2,
    userBio: 'Bio6',
    userAge: 23,
    birthday: testUtils.calcBirthday(23),
    primaryPic: 'path/to/pic6'
  }
];

const likes = [
  { user1ID: 1, user2ID: 2, userAction: 'L', actionDate: '1997-05-15' },
  { user1ID: 1, user2ID: 3, userAction: 'L', actionDate: '1996-05-15' },
  { user1ID: 1, user2ID: 4, userAction: 'L', actionDate: '1995-05-15' },
  { user1ID: 1, user2ID: 5, userAction: 'L', actionDate: '1994-05-15' },
  { user1ID: 2, user2ID: 1, userAction: 'L', actionDate: '1993-05-15' },
  { user1ID: 3, user2ID: 1, userAction: 'P', actionDate: '1992-05-15' },
  { user1ID: 4, user2ID: 1, userAction: 'L', actionDate: '1991-05-15' },
  { user1ID: 5, user2ID: 1, userAction: 'P', actionDate: '1990-05-15' }
];

const getUserByID = id => {
  if (users[id - 1].userID != id) {
    throw Error('matches.testdata.getUserByID Error');
  }
  return users[id - 1];
};

const getMatchDate = (id1, id2) => {
  const matchDate1 = new Date(
    likes.find(x => x.user1ID == id1 && x.user2ID == id2).actionDate
  );
  const matchDate2 = new Date(
    likes.find(x => x.user2ID == id1 && x.user1ID == id2).actionDate
  );
  return new Date(Math.max(matchDate1, matchDate2)).toISOString().split('T')[0];
};

module.exports = {
  users,
  likes,
  getUserByID,
  getMatchDate
};
