import React from 'react';
import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import fetchMock from 'fetch-mock';

import { Profile } from './Profile';

describe('<Profile />', () => {
  const testProfile = {
    userBio: 'This is a test bio for a test user',
    userBirthday: '1991-10-18T05:00:00.000Z',
    userName: 'Test User'
  };

  describe('Snapshot tests', () => {
    it('should be hidden by default', () => {
      const component = renderer.create(<Profile hideProfile={jest.fn()} />);
      expect(component).toMatchSnapshot();
    });

    it('should display if profile properties are all empty', () => {
      const component = renderer.create(
        <Profile
          isVisible
          userInfo={{ userBio: null, userBirthday: null, userName: null }}
        />
      );
      expect(component).toMatchSnapshot();
    });

    it('should display profile properties when provided', () => {
      const component = renderer.create(
        <Profile isVisible userInfo={testProfile} />
      );
      expect(component).toMatchSnapshot();
    });
  });

  describe('Enzyme tests', () => {
    let wrapper;
    let mockClickHandler;

    beforeEach(() => {
      mockClickHandler = jest.fn();
      wrapper = mount(
        <Profile
          isVisible
          userInfo={testProfile}
          clickHandler={mockClickHandler}
        />
      );
    });

    describe('Gender Filter', () => {
      let genderFilter;
      let defaultState;

      fetchMock.get(/\/api\/ref\/gender/, [
        { id: 1, value: 'test1' },
        { id: 2, value: 'test2' },
        { id: 3, value: 'test3' }
      ]);

      beforeEach(() => {
        fetchMock.reset();
        genderFilter = wrapper.find('div.filters .gender');
        defaultState = wrapper.state();
      });

      it('should update state on toggle', () => {
        expect(wrapper.find('.filter.element.disabled')).toHaveLength(1);
        expect(!!defaultState.filters).toEqual(true);
        expect(defaultState.filters.gender).toBe(null);

        genderFilter.find('.toggle input').simulate('change');

        expect(wrapper.find('.filter.element.disabled')).toHaveLength(0);
        expect(!!wrapper.state().filters).toEqual(true);
        expect(wrapper.state().filters.gender).toEqual({ active: true });

        genderFilter.find('.toggle input').simulate('change');

        expect(wrapper.find('.filter.element.disabled')).toHaveLength(1);
        expect(!!wrapper.state().filters).toEqual(true);
        expect(wrapper.state().filters.gender).toEqual({ active: false });
      });
    });
  });
});
