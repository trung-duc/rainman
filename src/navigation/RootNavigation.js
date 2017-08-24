/**
 * Copyright (c) <year>, <copyright holder>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the <organization> nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * @flow
 */

import { Notifications } from 'expo';
import { Ionicons } from '@expo/vector-icons';

import PropTypes from 'prop-types';

import React from 'react';
import { Platform } from 'react-native';
import { addNavigationHelpers, TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';

import Colors from '../constants/Colors';

import AddScreen from '../screens/AddScreen';
import ShuffleScreen from '../screens/ShuffleScreen';
import TestScreen from '../screens/TestScreen';
import StackScreen from '../screens/StackScreen';

import WordListStackNavigator from './WordListNavigation';


export const MainTabNavigator = TabNavigator(
  {
    List: {
      screen: WordListStackNavigator,
    },
    Add: {
      screen: AddScreen,
    },
    Shuffle: {
      screen: ShuffleScreen,
    },
    Test: {
      screen: TestScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'List':
            iconName = Platform.OS === 'ios'
              ? `ios-apps${focused ? '' : '-outline'}`
              : 'md-apps';
            break;
          case 'Add':
            iconName = Platform.OS === 'ios'
              ? `ios-create${focused ? '' : '-outline'}`
              : 'md-create';
            break;
          case 'Shuffle':
            iconName = Platform.OS === 'ios'
              ? `ios-shuffle${focused ? '' : '-outline'}`
              : 'md-shuffle';
            break;
          case 'Test':
            iconName = Platform.OS === 'ios'
              ? `ios-book${focused ? '' : '-outline'}`
              : 'md-book';
            break;
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
  }
);

/**
 * Integrate react-navigation state into redux state tree.
 */
class RootNavigator extends React.Component {

  componentDidMount() {
    this._notificationSubscription = this._registerForPushNotifications();
  }

  componentWillUnmount() {
    this._notificationSubscription && this._notificationSubscription.remove();
  }

  render() {
    return (
      <MainTabNavigator
        navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav
        })}
      />
    );
  }

  _registerForPushNotifications() {
    // Send our push token over to our backend so we can receive notifications
    // You can comment the following line out if you want to stop receiving
    // a notification every time you open the app. Check out the source
    // for this function in api/registerForPushNotificationsAsync.js
    registerForPushNotificationsAsync();

    // Watch for incoming notifications
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = ({ origin, data }) => {
    console.log(
      `Push notification ${origin} with data: ${JSON.stringify(data)}`
    );
  };
}

RootNavigator.propTypes = {
  dispatch: PropTypes.func.isRequired,
  nav: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({ nav: state.nav })

export default connect(mapStateToProps)(RootNavigator);