import React from 'react';
import { StyleSheet, View, Text, Image} from 'react-native'; 

class MainPage extends React.Component {

    render(){
        const { navigation } = this.props;
        const { user } = navigation.state.params;
        const { people } = this.props.navigation.state.params;
      //  console.log(user);  
        return( 
            <View>
                <Image
                    source={{
                        uri: 'https://s3.amazonaws.com/uploads-sgp/masculino.png',
                    }}/> 
                 <Text>Bem Vindo </Text>
            </View>
            )
    }
} 

export default MainPage;