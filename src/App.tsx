import React, { Component } from 'react'
import {RouteComponentProps } from '@reach/router'
import { Router } from '@reach/router'
import { User } from './pages/User'
import  {InfoUser as Guest}  from './pages/Info'
import { isEmptyObject } from './middleware/isEmpty'


import './App.css'

interface IProps extends RouteComponentProps {
  nameUser? : string;
  old? : string;
  
}

interface IState {
  data : object;
  userInfo: object;
}

class RoutedApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      data: {},
      userInfo : {},
    };
  }

  showAlert = ( e : any) => {
    this.getMoreInfoUSers(e.target.id)
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
        this.setState({ userInfo : dataUser })
    });
  }

  handleClick = () => {
    this.setState({
      userInfo : {},
    })
  }

 

  render() {
    const {data, userInfo} = this.state;
    if (!isEmptyObject(data)) {
      return (
        <Router>
          <User 
            path="/" 
            data={data}
            showAlert = {this.showAlert}
          />      
          {isEmptyObject(userInfo) ? null  : <Guest path="/guest" userInfo={userInfo} CloseBlockInfo={this.handleClick}/> }
        </Router>
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

export { RoutedApp }
