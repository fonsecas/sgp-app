import { createStackNavigator } from 'react-navigation';

import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';

export default createStackNavigator({
    'Login': {
        screen: LoginPage,
        navigationOptions: {
            title: 'Login'
        }
    },
    'Main': {
        screen: MainPage,
    }
},{
    navigationOptions: {
        title: "Bem Vindo",
        headerStyle: {
            backgroundColor: "#303F9F",
            borderBottomWidth: 1,
            borderBottomColor: '#c5c5c5',
        },
        headerTitleStyle: {
            color: 'white',
            fontSize: 30, 
        }
    }
})