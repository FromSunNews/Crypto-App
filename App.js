import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import Tabs from "./navigation/tabs";

import { createStore, applyMiddleware } from 'redux'
import { Provider } from "react-redux"
import thunk from 'redux-thunk'
import rootReducer from './stores/rootReducer'

import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
)

const App = () => {
  const [loaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });
  if (!loaded) {
    return null;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={'MainLayout'}
        >
          <Stack.Screen
            name="MainLayout"
            component={Tabs}
            options={{ header: () => null }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>

  )
}

export default App;