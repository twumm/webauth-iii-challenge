import React from 'react'

const SignUp = () => {
  const username = React.createRef();
  const password = React.createRef();
  const department = React.createRef();

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='username'
          value={username}
        />
        <input
          type='password'
          placeholder='password'
          value={password}
        />
        <input
          type='text'
          placeholder='department'
          value={department}
        />
      </form>
    </div>
  )
}

export default SignUp
