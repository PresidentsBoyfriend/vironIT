import * as React from 'react'
import { connect, ConnectedProps } from 'react-redux'
interface RootState {
  isOn: boolean
}
const mapState = (state: RootState) => ({
  isOn: state.isOn
})
const mapDispatch = {
  toggleOn: () => ({ type: 'TOGGLE_IS_ON' })
}
const connector = connect(
  mapState,
  mapDispatch
)

type PropsFromRedux = ConnectedProps<typeof connector>

const InfoUser = (props : PropsFromRedux) => {

  return (
    <ul className="blockInfo">
      <button onClick={props.toggleOn}>
        Button is {props.isOn ? 'ON' : 'OFF'}
      </button>
    </ul>
  )
}

export default connector(InfoUser)
