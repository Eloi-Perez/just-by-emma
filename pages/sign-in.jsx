import signinStyle from '../styles/sign-in.module.scss'


const CreateAccount = () => {
  return (
    <div className={signinStyle.container}>
      <div className={signinStyle.wrapper}>
        <img className={signinStyle.image} src='' alt='' />
        <p className={signinStyle.description}>
          A natural skincare range. Just simple 100% natural ingredients,
          lovingly handmade. Keeping your skincare routine simple and natural
        </p>
        <p className={signinStyle.title}>Sign in</p>
        <p>Welcome again please sign in</p>
        <form className={signinStyle.form}>
          <input className={signinStyle.input} type='text' />
          <input
            className={signinStyle.input}
            type='text'
            placeholder='First Name'
          />
          <input
            className={signinStyle.input}
            type='text'
            placeholder='Last Name'
          />
          <input
            className={signinStyle.input}
            type='text'
            placeholder='Email'
          />
          <input
            className={signinStyle.input}
            type='text'
            placeholder='Password'
          />
        </form>
        <div className={signinStyle.buttonContainer}>
          <button className={signinStyle.login}>Login</button>
          <button className={signinStyle.create}>Create Account</button>
        </div>

        <p>Guest Option</p>
      </div>
    </div>
  )
}

export default CreateAccount
