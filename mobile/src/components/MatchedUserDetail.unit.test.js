import React from 'react';
import renderer from 'react-test-renderer';

import MatchedUserDetail from './MatchedUserDetail';

describe('<MatchedUserDetail />', () => {
  const testData =
    {
      userID: 1,
      userName: 'Mac Miller',
      age: 21,
      primaryPic: 'https://i.scdn.co/image/f4509fe9c589c12be5470653178f901bd697b97b',
      userBio: 'He raps, he does some other stuff too but mostly just that',
      matchDate: '2018-02-03T18:09:05.000Z',
    };

  it('should render when empty', () => {
    const rendered = renderer.create(<MatchedUserDetail data={[]} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });

  it('renders with data', () => {
    const rendered = renderer.create(<MatchedUserDetail data={testData} />).toJSON();
    expect(rendered).toMatchSnapshot();
  });
});
