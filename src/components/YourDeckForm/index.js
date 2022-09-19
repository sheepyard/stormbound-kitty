import React from 'react'
import { CardsContext } from '~/components/CardsProvider'
import CTA from '~/components/CTA'
import Input from '~/components/Input'
import Link from '~/components/Link'
import Row from '~/components/Row'
import TagsSelect from '~/components/TagsSelect'
import serialization from '~/helpers/serialization'
import getDeckIDFromURL from '~/helpers/getDeckIDFromURL'
import { convertToSkId, isSbId } from '~/helpers/convertDeckId'

const validateDeckId = (cardsIndex, cardsIndexBySid, id) => {
  if (!id) return false

  // In case the given string is a URL, trim everything but the ID.
  id = getDeckIDFromURL(id)

  // If it’s a SBID, convert it to a SKID and call the function again to check
  // if it’s valid.
  if (isSbId(id)) {
    try {
      const skid = convertToSkId(cardsIndexBySid, id)

      return validateDeckId(cardsIndex, cardsIndexBySid, skid)
    } catch {
      return false
    }
  }

  try {
    return serialization.deck
      .deserialize(cardsIndexBySid, id)
      .every(card => card.id in cardsIndex)
  } catch {
    return false
  }
}

export default React.memo(function YourDeckForm(props) {
  const { cardsIndex, cardsIndexBySid } = React.useContext(CardsContext)
  const [deckID, setDeckID] = React.useState(props.id)
  const isIdValid = validateDeckId(cardsIndex, cardsIndexBySid, deckID)
  const [tags, updateTags] = React.useState(props.tags || [])

  return (
    <form onSubmit={props.onSubmit} data-testid='deck-form'>
      <Row>
        <Row.Column>
          <Input
            label='Deck URL or ID'
            required
            id='id'
            data-testid='deck-id-input'
            autoComplete='off'
            value={deckID}
            onChange={event => setDeckID(event.target.value)}
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <Input
            label='Deck name'
            required
            id='name'
            data-testid='deck-name-input'
            maxLength={30}
            defaultValue={props.name}
            autoComplete='off'
          />
        </Row.Column>
      </Row>
      <Row>
        <Row.Column>
          <TagsSelect
            availableTags={props.availableTags}
            label='Deck tags'
            tags={tags}
            updateTags={updateTags}
            required
            id='deck-tags'
            name='deck-tags'
          />
        </Row.Column>
      </Row>
      <Row withNarrowGutter spacing={{ top: 'LARGE' }}>
        <Row.Column>
          <CTA
            type='submit'
            data-testid='deck-submit'
            disabled={!isIdValid || tags.length === 0}
            title={isIdValid ? undefined : 'This deck ID is invalid'}
          >
            {props.id || props.name || props.tags ? 'Update deck' : 'Add deck'}
          </CTA>
        </Row.Column>
        <Row.Column extend={{ justifyContent: 'center' }}>
          <Link onClick={props.cancel}>Nevermind</Link>
        </Row.Column>
      </Row>
    </form>
  )
})
