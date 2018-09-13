import React from 'react';
import {View, Text, TextInput, StyleSheet, Button, ActivityIndicator, Alert, Image } from 'react-native';
import FormRow from '../components/FormRow';
import { connect } from 'react-redux';
import { tryLogin } from '../actions';
import ClienteList from '../components/ClienteList';


class LoginPage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            mail: '',
            password: '',
            clientes: [],
            isLoading: false,
            isClienteAlfa: true,
        }
    }  
    componentDidMount() {
     
	}  
    onChangeHandler(field, value){ 
        this.setState({   
            [field]: value
        })
    }
 
    tryLogin(){
        this.setState({ isLoading: true })
        const {mail: email, password } = this.state;
        this.props.tryLogin( {email, password})
            .then((user) => { 
                if (user){
                    if(user.clientes){
                        const { clientes } = user;

                        this.setState({ clientes : clientes, isLoading: false}) 
                        console.log('Voce logou com o Alfa') 
                        this.hideLoginForm();
                    } else{ 
                      return this.props.navigation.navigate('Main', { user: user });
                    } 
                } else{  

                    this.setState({ isLoading: false })

                    Alert.alert(   
                        'Dados Invalidos', 
                        'Usuario ou Senha invalidos',
                        [
                          {text: 'Ok', onPress: () => ''},
                        ],
                        { cancelable: false }
                      )
                }
            })
            }

    hideLoginForm = () =>{

        if(this.state.isClienteAlfa == true)
        {
            this.setState({isClienteAlfa: false})
        }
        else
        {
            this.setState({isClienteAlfa: true})
        }
        }
    tryLogout(){
        fetch('http://api.gerenciamentopolitico.com.br:8080/api/v1/auth/logout', {
            method: 'GET',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            }
        }).then((response) => response.json())
            .then((responseJson) => {
                return console.log(responseJson);
            })
            .catch((error) => {
                console.error(error);
            })
            .then(() => this.setState({ isLoading: false }))
    }

    renderButton() {
        if (this.state.isLoading)
            return <ActivityIndicator/>

        return(
        <Button 
        title="Entrar"
        onPress={() => this.tryLogin()}/>
        )
    }
 
    renderButtonLogout(){
       return( <Button
        title="Sair" 
        onPress={() => this.tryLogout()}
        />
       )
    }
    
    render(){
        return(

            <View style={styles.container}>
            <View  style={styles.loginContainer}> 
                    <Image
							style={styles.logo}
							source={require('../img/logo.png')} />
            </View>
            { this.state.isClienteAlfa ? 

                <FormRow first>
                    <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="usuario@mail.com"
                        value={this.state.mail}
                        onChangeText={value => this.onChangeHandler ('mail', value)}
                     />

                </FormRow> : null }
                { this.state.isClienteAlfa ? 
                <FormRow last>
                <TextInput
                        style={styles.input}
                        underlineColorAndroid='transparent'
                        placeholder="*******"
                        secureTextEntry
                        value={this.state.password}
                        onChangeText={value => this.onChangeHandler ('password', value)}
                     />
                </FormRow> : null }  
                { this.state.isClienteAlfa ? this.renderButton() : null }
                <View style={styles.buttonLogout}>
                { this.state.isClienteAlfa ? this.renderButtonLogout() : null }
                </View> 

                {!this.state.isClienteAlfa ? <ClienteList
				clientes={this.state.clientes}
				onPressItem={pageParams => { 
					this.props.navigation.navigate('Main', pageParams); 
				}} /> : null}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
    },
    input:{
        paddingLeft: 5,
        paddingRight: 5,
        paddingBottom: 5,
        borderRadius: 1, 
        fontSize: 15
    },
    loginContainer:{
        paddingBottom: 20,
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        resizeMode: 'contain',

    },
    buttonLogout:{
        marginTop: 10,
    }

})

export default connect(null, { tryLogin })(LoginPage)