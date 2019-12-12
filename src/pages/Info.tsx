import * as React from 'react'

import { RouteComponentProps } from '@reach/router'

interface DataHomePage extends RouteComponentProps {
  InfoAboutUser : any;
  CloseBlockInfo : () => void;
}

const InfoUser: React.FC<DataHomePage> = (props) => {

  if (props.InfoAboutUser.length) {
    console.log(props.InfoAboutUser)
    var listItem = props.InfoAboutUser.map((item : any) => 
      <>
        <p className="infoUser"  id={item._id} key={item._id}>Name : {item.name}</p>
        <p className="infoUser"  id={item._id} key={item._id}>Surname : {item.surname}</p>
        <p className="infoUser"  id={item._id} key={item._id}>Login : {item.login}</p>
        <p className="infoUser"  id={item._id} key={item._id}>ID : {item._id}</p>
      </> 
    );
  }


  return (
    <section className="blockInfo">
      {listItem}
      <button className="btnClose" onClick = {props.CloseBlockInfo}>close</button>
    </section>
  )
}

export { InfoUser }
