export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const userLoginSuccess = user => ({
    type: USER_LOGIN_SUCCESS,
    user
});

export const USER_LOGOUT = 'USER_LOGOUT';
const userLogout = () => ({
    type: USER_LOGOUT,
}); 

export const tryLogin =( { email, password }) => dispatch  => {
    return fetch('http://api.gerenciamentopolitico.com.br:8080/api/v1/auth/login', {
            method: 'POST',
            headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            login: email,
            senha: password,
            }),  
        }).then((response) => response.json())
            .then((responseJson) => { 
  
                if ( responseJson && responseJson.tipo == 'error'){
                   return null;
               } else {  
                //console.log(responseJson)
                const action = userLoginSuccess(responseJson);
                dispatch(action);
                return responseJson; 
               }
               
                //return console.log(responseJson);
                //this.props.navigation.navigate('Main'); 
            })
             .catch((error) => {
                 console.error(error); 
             })
           
}

