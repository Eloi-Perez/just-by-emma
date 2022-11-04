import CreateStyle from '../styles/register.module.scss'


const CreateAccount = () => {


  
  return (
    <div className={CreateStyle.container}>
      <div className={CreateStyle.wrapper}>
        <img
          className={CreateStyle.image}
          src='https://unsplash.com/photos/0XnuFXiMLTk'
          alt=''
        />
        <p className={CreateStyle.description}>
          A natural skincare range. Just simple 100% natural ingredients,
          lovingly handmade. Keeping your skincare routine simple and natural
        </p>
        <p className={CreateStyle.title}>Create Account</p>
        <form className={CreateStyle.form}>
          <input className={CreateStyle.input} type='text' />
          <input
            className={CreateStyle.input}
            type='text'
            placeholder='First Name'
          />
          <input
            className={CreateStyle.input}
            type='text'
            placeholder='Last Name'
          />
          <input
            className={CreateStyle.input}
            type='text'
            placeholder='Email'
          />
          <input
            className={CreateStyle.input}
            type='text'
            placeholder='Password'
          />
        </form>

        <button className={CreateStyle.button}>Create Account</button>
        <p>Guest Option</p>
      </div>
    </div>
  )
}

export default CreateAccount
