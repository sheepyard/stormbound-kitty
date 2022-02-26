import React from 'react'
import ValueCalculator from '~/components/ValueCalculator'
import Layout from '~/components/Layout'
import getCardValue from '~/helpers/getCardValue'
import getNavigation from '~/helpers/getNavigation'
import serialization from '~/helpers/serialization'
import CARDS from '~/data/cards'

export async function getStaticPaths() {
  return { paths: [{ params: { id: null } }], fallback: 'blocking' }
}

export async function getStaticProps({ params, preview: isPreview = false }) {
  const navigation = await getNavigation({ isPreview })
  const [id] = params.id || []
  const defaultCard = { id: null, level: 1 }
  const disabledOptions = CARDS.map(card => card.id).filter(
    id => !getCardValue(id)
  )

  try {
    const cards = serialization.cards.deserialize(id)
    return {
      props: {
        allCards: CARDS,
        navigation,
        cards: [cards[0] || defaultCard, cards[1] || defaultCard],
        disabledOptions,
      },
    }
  } catch (error) {
    return {
      props: {
        allCards: CARDS,
        navigation,
        cards: [defaultCard, defaultCard],
        disabledOptions,
      },
    }
  }
}

const ValueCalculatorPage = ({ navigation, allCards, ...props }) => (
  <Layout
    active={['TOOLS', 'CALCULATORS', 'VALUE_CALCULATOR']}
    navigation={navigation}
    cards={allCards}
  >
    <ValueCalculator {...props} />
  </Layout>
)

export default ValueCalculatorPage
