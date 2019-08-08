import React from 'react'

const SignUp = () => {
  const usernameRef = React.createRef();
  const passwordRef = React.createRef();
  const departmentRef = React.createRef();

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
          type='text'
          placeholder='department'
          ref={departmentRef}
        />
        <input
          type='submit'
          value="Sign Up"
        />
      </form>
    </div>
  )
}

export default SignUp
