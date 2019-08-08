import React from 'react'

const SignIn = () => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();

  return (
    <div>
      <form>
        <input
          type='text'
          placeholder='username'
          ref={usernameRef}
        />
        <input
          type='password'
          placeholder='password'
          ref={passwordRef}
        />
        <input
          type='submit'
          value='Sign In'
        />
      </form>
    </div>
  )
}

export default SignIn
