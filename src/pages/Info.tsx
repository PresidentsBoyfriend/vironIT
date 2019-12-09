import * as React from 'react'

import { RouteComponentProps } from '@reach/router'

interface DataHomePage extends RouteComponentProps {
  userInfo : any;
  CloseBlockInfo : () => void;
}

const InfoUser: React.FC<DataHomePage> = (props) => {

  if (props.userInfo.length) {
    console.log(props.userInfo)
    var listItem = props.userInfo.map((item : any) => 
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
