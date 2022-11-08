import * as D from '@radix-ui/react-dialog'
import { useState } from 'react'

import s from './dialog.module.scss'

export default function Dialog({ trigger, title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <D.Root open={open} onOpenChange={setOpen}>
      <D.Trigger asChild>{trigger}</D.Trigger>{/* asChild */}
      <D.Portal>
        <D.Overlay className={s.overlay}>
          <D.Content className={s.content}>
            <D.Close className={s.close}>X</D.Close>
            <D.Title>{title}</D.Title>
            {/* <D.Description>subtitle</D.Description> */}
            {children}
          </D.Content>
        </D.Overlay>
      </D.Portal>
    </D.Root>
  )
}