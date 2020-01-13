// import * as React from 'react'
// import { connect } from 'react-redux'
// import { addTodo } from '../actions'
// // import { Dispatch } from 'redux'
// // import { Dispatch } from 'redux';
// import TodoList from './show'


// const AddTodo = (props) => {
//   let input = "Andrey";

//   return (
//     <div>
//       <TodoList/>
//       <form onSubmit={e => {
//         e.preventDefault()
//         // if (!input.value.trim()) {
//         //   return
//         // }
//         props.dispatch(addTodo(input))
//         // input.value = ''
//       }}>
//         {/* <input ref={node => input = node} /> */}
//         <button type="submit">
//           Add Todo
//         </button>
//         <div onClick={() => {
//             props.dispatch(addTodo(input))
//         }}>
//         Aaa 
//         </div>
//       </form>
//     </div>
//   )
// }

// export default connect()(AddTodo)