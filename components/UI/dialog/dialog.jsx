import * as D from '@radix-ui/react-dialog'
import { useState, cloneElement } from 'react'

import s from './dialog.module.scss'

export default function Dialog({ trigger, button = false, title, children }) {
  const [open, setOpen] = useState(false)

  const triggerStyle = button ? null : s.resetTriggerButton

  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Trigger className={triggerStyle}>{trigger}</D.Trigger>
      {/* asChild <a tabIndex="0"></a>*/}
      <D.Portal>
        <D.Overlay className={s.overlay}>
          <D.Content className={s.content}>
            <D.Close className={s.close}>X</D.Close>
            <D.Title>{title}</D.Title>
            {/* <D.Description>subtitle</D.Description> */}
            {cloneElement(children, {
              close: () => {
                setOpen(false)
              },
            })}
          </D.Content>
        </D.Overlay>
      </D.Portal>
    </D.Root>
  )
}
