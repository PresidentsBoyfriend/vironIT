import React, { Component } from 'react'
import { Router } from '@reach/router'
import {Form}  from './pages/Form'
import  InfoUser  from './pages/Info'
import { isEmptyObject } from './middleware/isEmpty'

import { connect, ConnectedProps } from 'react-redux'
interface RootState {
  isOn: boolean
}
const mapState = (state: RootState) => ({
  isOn: state.isOn
})
const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}
const connector = connect(
  mapState,
  mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

import './App.css'

interface IState {
  data : object;
  usersInfo: object;
  infoAboutUser: object;
  modalSign : any;
  modalLog : any;
  showSignBlockStatus : boolean;
  showLogBlockStatus : boolean;
  access_token : string;
  refresh_token : string;
}

class RoutedApp extends Component<PropsFromRedux, IState> {
  constructor(props:  PropsFromRedux) {
    super(props);

    this.state = {
      data: {},
      usersInfo : {},
      infoAboutUser : {},
      access_token : "",
      refresh_token : "",
      modalSign : <>
              <form className='blockBuy'>
                <a href="#" onClick={this.closeBlockSign} className="close"></a>
                <header>
                    <p>Регистрация</p>
                </header>
                <div>
                    <label>Имя:</label>
                    <input className="dataUserName" required type="text" />
                    <label>Фамилия:</label>
                    <input className="dataUserSurname" required type="text" />   
                    <label>Логин:</label>
                    <input className="dataUserLogin" required type="text" />
                    <label>Пароль:</label>
                    <input className="dataUserPassword" required type="password" />                                     
                </div>
                <footer>
                  <div onClick={this.getSign} className="btnReg">Зарегистрироваться</div>
                </footer>
              </form>
              <div className='back'></div>
            </>,
      showSignBlockStatus : false,
      modalLog : <>
              <form className='blockBuy'>
                <a href="#" onClick={this.closeBlockSign} className="close"></a>
                <header>
                    <p>Log in</p>
                </header>
                <div> 
                    <label>Логин:</label>
                    <input className="dataUserLogin" required type="text" />
                    <label>Пароль:</label>
                    <input className="dataUserPassword" required type="password" />                                     
                </div>
                <footer>
                  <div onClick={this.login} className="btnReg">Log in</div>
                </footer>
              </form>
              <div className='back'></div>
            </>,
      showLogBlockStatus : false,
    };
    
    
    this.getSign = this.getSign.bind(this)
  }

  showAlert = ( e : any) => {
    this.getMoreInfoUSers(e.target.id)
  }

  showBlockSign = () => {
    this.setState({
      showSignBlockStatus : true,
    })
  }

  showBlockLog = () => {
    this.setState({
      showLogBlockStatus : true,
    })
  }

  componentDidMount() {
    fetch('http://localhost:3000/users/', {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      })
      .then(response => response.json())
      .then(dataUser => {
          this.setState({ data : dataUser })
      });
  }

  getMoreInfoUSers (USER_ID : string) {
    fetch('http://localhost:3000/users/'+USER_ID+'', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(dataUser => {
        this.setState({ usersInfo : dataUser })
    });
  }

  getSign = async () => {
    let signDataUser = {
                  login : document.getElementById('root')!.querySelector<HTMLInputElement>('.dataUserLogin')!.value,
                  password : document.getElementById('root')!.querySelector<HTMLInputElement>('.dataUserPassword')!.value,
                  name : document.getElementById('root')!.querySelector<HTMLInputElement>('.dataUserName')!.value,
                  surname : document.getElementById('root')!.querySelector<HTMLInputElement>('.dataUserSurname')!.value
    }
    // let error = {};
    if (signDataUser.login && signDataUser.password && signDataUser.name && signDataUser.surname) {
      await fetch('http://localhost:3000/users/', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(signDataUser)
      })
      .then(response => response.json())
      .then(info => {          
          info.error ? alert (info.error) : this.closeBlockSign(info);
        }
      )  
    } 
  }

  login = () => {
    let loginDataUser = {
      login : document.getElementById('root')!.querySelector<HTMLInputElement>('.dataUserLogin')!.value,
      password : document.getElementById('root')!.querySelector<HTMLInputElement>('.dataUserPassword')!.value
    } 
    fetch('http://localhost:3000/users/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginDataUser)
    })
    .then(response => response.json())
    .then(info => {          
        if (!info.error) {
          this.closeBlockSign(info); 
          this.timer();
        }
      }
    )
  }

  closeBlockSign = (info : any) => {
    console.log(info.user)
    this.setState({
      infoAboutUser : info.user,
      access_token : info.access_token,
      refresh_token : info.refresh_token,
      showSignBlockStatus : false,
      showLogBlockStatus : false,
    }); 
  }

  timer = () => {
    setInterval(() => this.getRefresh(), 1000*60*3)
  }

  getRefresh = () => {
    fetch('http://localhost:3000/users/refresh/', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Refresh' : this.state.refresh_token
      }
    })
    .then(response => response.json())
    .then(info => {          
        info.error ? alert (info.error) : this.closeBlockSign(info);
      }
    )
  }

  handleClick = () => {
    this.setState({
      usersInfo : {},
    })
  }

 

  render() {
    const {data, showSignBlockStatus,showLogBlockStatus,  modalSign, modalLog} = this.state;
    if (!isEmptyObject(data)) {
      return (
        <>
        <InfoUser/>
        <button onClick={this.props.toggleOn}>
          Toggle is {this.props.isOn ? 'ON' : 'OFF'}
        </button>
        <Router>          
          <Form 
            path="/" 
            data={data}
            showAlert = {this.showAlert}
            showBlockSign = {this.showBlockSign}
            showLogBlockStatus = {showLogBlockStatus}
            showSignBlockStatus = {showSignBlockStatus}
            modalLog = {modalLog}
            modalSign = {modalSign}
            showBlockLog = {this.showBlockLog}
          />      
        </Router>
        </>
      )
    } else {
      return (
        <>
        Loading...
        </>
      )
    }
  }
}

export default connector(RoutedApp)