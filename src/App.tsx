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
  UsersData : object;
  InfoAboutUser: object;
}

class RoutedApp extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.state = {
      UsersData: {},
      InfoAboutUser : {},
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
      .then(dataFormBD => {
          this.setState({ UsersData : dataFormBD })
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
      .then(dataAdoutUser => {
          this.setState({ InfoAboutUser : dataAdoutUser })
      });
  }

  handleClick = () => {
    this.setState({
      InfoAboutUser : {},
    })
  }

  


  render() {
    const {UsersData, InfoAboutUser} = this.state;
    if (!isEmptyObject(UsersData)) {
      return (
        <>
          <User 
            path="/guest" 
            UsersData={UsersData}
            showAlert = {this.showAlert}
          />      
          {isEmptyObject(InfoAboutUser) ? null  : <InfoUser InfoAboutUser={InfoAboutUser} CloseBlockInfo={this.handleClick}/> }
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
