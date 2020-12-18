import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProgramsScreen from './src/screens/ProgramsScreen'
import TracksScreen from './src/screens/TracksScreen'

const Stack = createStackNavigator()

const App = () => {
  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Programs" component={ProgramsScreen}/>
        <Stack.Screen name="Tracks" component={TracksScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App