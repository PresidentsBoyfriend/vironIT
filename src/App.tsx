import React, { Component } from 'react'
import {RouteComponentProps } from '@reach/router'
import { User } from './pages/User'
import { InfoUser } from './pages/Info'
import { isEmptyObject } from './middleware/isEmpty'


import './App.css'

interface IProps extends RouteComponentProps {
  nameUser? : string;
  old? : string;
  
}

interface IState {
  data? : object; // TODO add correct interface
  userInfo?: object; // TODO add correct interface
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

  componentDidMount() { // Why did you use await and then at the same time?
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

  async getMoreInfoUSers (USER_ID : string) {
    await fetch('http://localhost:3000/users/'+USER_ID+'', {
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
        <>
          <User 
            path="/guest" 
            data={data}
            showAlert = {this.showAlert}
          />      
          {isEmptyObject(userInfo) ? null  : <InfoUser userInfo={userInfo} CloseBlockInfo={this.handleClick}/> }
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


export { RoutedApp }
