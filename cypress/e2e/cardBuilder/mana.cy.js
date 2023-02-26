import s from './selectors'

const assertCardMana = (index, mana) =>
  cy.get(s.CARD_PREVIEW).eq(index).find(s.CARD_MANA).should('have.text', mana)

describe('Card Builder — Mana', () => {
  let id = ''

  beforeEach(() => cy.visit(['/card', id].filter(Boolean).join('/')))

  afterEach(() =>
    cy.url().then(url => {
      let last = url.split('/').pop()
      if (last !== 'card') id = last
    })
  )

  it('should be possible to define the card mana', () => {
    cy.get(s.MANA_INPUT).should('be.empty')
    assertCardMana(0, '')
    cy.get(s.MANA_INPUT)
      .should('be.visible')
      .type('5')
      .should('have.value', '5')
    assertCardMana(0, '5')
  })

  it('should be preserved upon reload', () => {
    cy.get(s.MANA_INPUT).should('have.value', '5')
    assertCardMana(0, '5')
  })
})
