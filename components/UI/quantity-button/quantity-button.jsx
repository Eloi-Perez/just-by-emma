import styles from './quantity-button.module.scss'

export default function QuantityButton(props) {
  return (
    <div className={styles.quantityContainer}>
      <button
        className={styles.button}
        onClick={() => props.handleSub(props.item.id, props.variant.size)}
      >
        {' '}
        -{' '}
      </button>
      <span> {props.variant.quantity} </span>
      <button
        className={styles.button}
        onClick={() => props.handleAdd(props.item.id, props.variant.size)}
      >
        {' '}
        +{' '}
      </button>
    </div>
  )
}
