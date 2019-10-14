import React,{Component,useReducer,createContext} from 'react';
import {firebase,auth} from '../../firebase';
import userAccountReducer, {
  UserAccountInitState
} from '../../reducers/profileReducers/accountDetailsReducer';

import {
  loginUser, logOutUser, SendEmailVerification
} from './actions';

export const UserAccountContext = createContext();
export default class UserAccountContextProvider extends Component {

    state = {user_account_state: {...UserAccountInitState}};

    doLogin = async (username,password) => {
      let user_account_state = await loginUser(username,password);
        this.setState({user_account_state});
      return user_account_state;
    }

    doLogout = async() => {
      let user_account_state = await logOutUser();
      this.setState({
        user_account_state
      });
      return user_account_state;
    };

    doSendEmailVerification = async() => {
      
        if (this.state.user_account_state.user_account.emailVerified){
          console.log('Cannot send verification email account already verified');
        }else{
          let user_account_state = await SendEmailVerification(this.state.user_account_state.user_account);

              await this.setState({
                user_account_state: user_account_state
              });    
            
          }

        return this.state.user_account_state;
    };

    fetchEmployeeCode = async(uid) => {

    };

    onChange = (user) => {
      let {
        user_account
      } = this.state.user_account_state;

      let user_account_state = Object.assign({},this.state.user_account_state)
      
      user_account_state.user_account = {
        ...user_account_state.user_account,
        uid: user.uid,
        displayName: user.displayName,
        photoURL: user.photoURL,
        email: user.email,
        password: user.password,
        emailVerified: user.emailVerified,        
        phoneNumber: user.phoneNumber,
      };



      this.setState({
        user_account_state
      });
    }

  componentWillMount = () => {
    // const unsubscribe = firebase.auth().onAuthStateChanged(this.onChange);    
    const dounsubscribe = firebase.firebase.auth().onAuthStateChanged(this.onChange);
  };  

  componentWillUnmount = () => {
    // actually unsubscribe here
  };

  render() {
    return (
      < UserAccountContext.Provider value = {
        {
          ...this.state, doLogin: this.doLogin, doLogout: this.doLogout, doSendEmailVerification: this.doSendEmailVerification
        }
      } >
                {this.props.children}
      </UserAccountContext.Provider>              
    )
  }
}
