import styles from './ui-code.module.css'

/* eslint-disable-next-line */
export interface UiCodeProps {}

export function UiCode(props: UiCodeProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to UiCode!</h1>
    </div>
  )
}

export default UiCode
