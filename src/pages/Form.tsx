import * as React from 'react'
import { Link } from '@reach/router'
import logo from '../img/logo.png'
import { RouteComponentProps } from '@reach/router'

interface DataHomePage extends RouteComponentProps {
  data : any;
  showAlert: (e : any) => void;
  showBlockSign: (e : any) => void;
  showBlockLog:(e : any) => void;
  showSignBlockStatus : boolean;
  showLogBlockStatus : boolean;
  modalSign : any;
  modalLog : any;
}

const Form: React.FC<DataHomePage> = (props) => {  
  if (props.data.length) {
    var listItem = props.data.map((item : any) => 
      <li className="userName" onClick={props.showAlert} id={item._id} key={item._id}>{item.login}</li>
    );
  }

  return (
    <> 
      <section className='UsersList'>
        <h1>Users</h1>
        <Link to="guest">
          <ul className="users">
            {listItem}
          </ul>
        </Link>
      </section>
      <header className="logo">
        <div className="logoImg">
          <a href="#"><img src={logo}/></a>
        </div>
        <div className="btnSection">
          <button onClick={props.showBlockLog}>Log in</button>
          <button onClick={props.showBlockSign}>Sing in</button>
        </div>
      </header>
      {props.showSignBlockStatus ? props.modalSign : null}
      {props.showLogBlockStatus ? props.modalLog : null}
    </>
  )
}

export { Form }
