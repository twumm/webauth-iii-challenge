import React from 'react'

const SignIn = () => {
  const username = React.createRef();
  const password = React.createRef();

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
      </form>
    </div>
  )
}

export default SignIn
