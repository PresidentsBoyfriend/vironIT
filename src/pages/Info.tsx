import * as React from 'react'
import { Link } from '@reach/router'
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
        <li className="infoUser"  id={item._id} key={item._id}>Name : {item.name}</li>
        <li className="infoUser"  id={item._id} key={item._id}>Surname : {item.surname}</li>
        <li className="infoUser"  id={item._id} key={item._id}>Login : {item.login}</li>
        <li className="infoUser"  id={item._id} key={item._id}>ID : {item._id}</li>
      </> 
    );
  }


  return (
    <ul className="blockInfo">
      {listItem}
      <Link className="btnBack" onClick = {props.CloseBlockInfo} to="/">Comeback</Link>
    </ul>
  )
}

export { InfoUser }
