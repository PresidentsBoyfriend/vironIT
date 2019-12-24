import * as React from 'react'
import { Link } from '@reach/router'
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
    <section className='UsersList'>
      <h1>Users</h1>
      <Link to="guest">
        <ul className="users">
          {listItem}
        </ul>
      </Link>
    </section>
  )
}

export { User }
