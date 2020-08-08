/**
 * @format
 */
import React, {components} from 'react';
import {AppRegistry} from 'react-native';
// import App from './App';
import {name as appName} from './app.json';
import BasicFlatListData from './components/BasicFlatListData';
import Home from './components/Home';

AppRegistry.registerComponent(appName, () => Home);
