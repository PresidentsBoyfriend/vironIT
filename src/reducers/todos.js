const isOn = (state = false, action) => {
  console.log("here")
  switch (action.type) {
    case 'TOGGLE_IS_ON':
      if (state === true) {
        return state = false
      } else return state = true;
    default:
      return state
  }
}

export default isOn