import { useInput } from '../../../hooks/useInput'

import { CardModelData } from '../../../data'
import styles from './CardContentForm.module.css'
import { useEffect, useRef, useState } from 'react'

interface CardContentFormProps {
  initialValues: CardModelData
  onSubmit(values: CardModelData): void
  onDeleteCard?(cardId: number): void
}

export const CardContentForm = (props: CardContentFormProps) => {
  const textArea = useRef()
  const { value, handleChange } = useInput(props.initialValues.content)

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    props.onSubmit({ ...props.initialValues, content: value })
  }

  const handleDeleteOnBackspace = (event: React.KeyboardEvent) => {
    if (event.key === 'Backspace' && value === '') {
      props.onDeleteCard && props.onDeleteCard(props.initialValues.id)
    }
  }
  const [fontSize, setFontSize] = useState(16)
  const fS = { fontSize: `${fontSize}px` }
  useEffect(() => {
    if (
      textArea.current &&
      textArea.current.scrollHeight - textArea.current.clientHeight > 0
    ) {
      setFontSize(fontSize - 2)
    }
  }, [value, fontSize])
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <textarea
        ref={textArea}
        style={fS}
        className={styles.textarea}
        autoFocus
        placeholder={'Start typing or press Backspace to delete this card'}
        value={value}
        onKeyDown={handleDeleteOnBackspace}
        onBlur={handleSubmit}
        onChange={handleChange}
      />
    </form>
  )
}
