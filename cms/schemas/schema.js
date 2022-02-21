import createSchema from 'part:@sanity/base/schema-creator'
import schemaTypes from 'all:part:@sanity/base/schema-type'
import artwork from './artwork'
import channel from './channel'
import contribution from './contribution'
import deck from './deck'
import donation from './donation'
import event from './event'
import faq from './faq'
import podcast from './podcast'
import puzzle from './puzzle'
import story from './story'
import swcc from './swcc'
import tournament from './tournament'

export default createSchema({
  name: 'default',
  types: schemaTypes.concat([
    artwork,
    channel,
    contribution,
    deck,
    donation,
    event,
    faq,
    podcast,
    puzzle,
    story,
    swcc,
    tournament,
  ]),
})
