import { useEffect, useRef, useState } from 'react'

import { CardContentForm } from './card-elements/CardContentForm'

import { useOutsideClick } from '../../hooks/useOutsideClick'

import styles from './Card.module.css'
import { CardModelData } from '../../data'
import { formatDate } from '../../utils/dates'

interface CardProps extends CardModelData {
  onUpdateCard?(updatedCard: CardModelData): void
  onDeleteCard?(cardId: number): void
}

export const Card = (props: CardProps) => {
  const ref = useRef(null)
  const [isEditing, setEditing] = useState(false)
  const paragraphRef = useRef<HTMLParagraphElement>(null)
  const CardConainerDivRef = useRef<HTMLDivElement>(null)
  const CreatedAtParagraphRef = useRef<HTMLParagraphElement>(null)
  const handleSetEditingOff = () => {
    setEditing(false)
  }

  useOutsideClick(ref, handleSetEditingOff)

  const handleSetEditingOn = () => {
    setEditing(true)
  }

  const handleSaveContent = (values: CardModelData) => {
    props.onUpdateCard && props.onUpdateCard(values)
    handleSetEditingOff()
  }

  const { content, createdAt } = props
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    const paragraph = paragraphRef.current
    const container = CardConainerDivRef.current
    const createdAt = CreatedAtParagraphRef.current

    const offsetContent = paragraph.clientHeight
    const createdAtHeight = createdAt.clientHeight

    const containerHeight = container.clientHeight - fontSize

    if (offsetContent + createdAtHeight > containerHeight) {
      setFontSize((prevSize) => prevSize - 2)
    }
  }, [content, fontSize])

  return (
    <div
      data-cy={`card-${props.id}`}
      className={styles.card}
      onClick={handleSetEditingOn}
      ref={CardConainerDivRef}
    >
      <p ref={CreatedAtParagraphRef} className={styles.date}>
        {props.createdAt ? formatDate(props.createdAt) : 'Date'}
      </p>

      {!isEditing ? (
        <p ref={paragraphRef} style={{ fontSize: `${fontSize}px` }}>
          {props?.content || 'Click to start noting'}
        </p>
      ) : (
        <CardContentForm
          initialValues={props}
          onSubmit={handleSaveContent}
          onDeleteCard={props.onDeleteCard}
        />
      )}
    </div>
  )
}
