import React from 'react'
import { createAppContainer, createStackNavigator } from "react-navigation"

import ScreenRegistry from './src/screens/ScreenRegistry'
import AllCard from './src/screens/AllCard'
import DetailCard from './src/screens/DetailCard'

export default class App extends React.Component {
    render() {
        return <AppContainer />
    }
}
const RootStack = createStackNavigator(
    {
        Home: ScreenRegistry,
        Cards: AllCard,
        Detail: DetailCard
    },
    {
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: "#302167"
            },
            headerTintColor: '#fff',
        }
    },
)
const AppContainer = createAppContainer(RootStack)
