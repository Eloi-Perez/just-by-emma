import s from '../styles/home.module.scss'

export default function Home() {
  return (
    <div className={s.main_container}>
        <h1 className={s.title}>
          Welcome to <a href="">Just by Emma</a>
        </h1>
        <p className={s.description}>
          Get started by editing{' '}
          <code className={s.code}>styles/home.module.scss</code>
        </p>
    </div>
  )
}
