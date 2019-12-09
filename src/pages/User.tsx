import * as React from 'react'

import { RouteComponentProps } from '@reach/router'

interface DataHomePage extends RouteComponentProps {
  data : any;
  showAlert: (e : any) => void;
}

const User: React.FC<DataHomePage> = (props) => {  
  if (props.data.length) {
    var listItem = props.data.map((item : any) => 
      <li className="userName" onClick={props.showAlert} id={item._id} key={item._id}>{item.login}</li>
    );
  }

  return (
    <>
      <ul className="users">
        {listItem}
      </ul>
    </>
  )
}

export { User }
