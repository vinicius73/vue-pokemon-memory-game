import { Snackbar } from 'buefy/dist/components/snackbar'
import { size, head, toUpper } from 'lodash-es'
import * as mutations from './mutations.type'

const cathAlert = identifier => {
  Snackbar.open({
    position: 'is-top',
    message: `You find ${toUpper(identifier)}!`,
    queue: false,
    duration: 1000
  })
}

const cardsActionsPlugin = store => {
  const resetSelecteds = () => {
    setTimeout(() => {
      store.commit(mutations.resetSelecteds)
    }, 400)
  }

  const addFound = ({ id, identifier }) => {
    cathAlert(identifier)
    store.dispatch('addFound', id)
  }

  store.watch(
    // get data
    (state, { isMath, selectedCards }) => ({ selectedCards, isMath }),
    // handler
    ({ selectedCards, isMath }) => {
      if (isMath) {
        addFound(
          head(selectedCards)
        )
      }

      // need reset
      if (size(selectedCards) === 2) {
        resetSelecteds()

        if (!isMath) {
          store.commit(mutations.addFailure)
        }
      }
    }
  )
}

export default cardsActionsPlugin
