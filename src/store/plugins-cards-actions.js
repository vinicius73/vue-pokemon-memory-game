import { Snackbar } from 'buefy/dist/components/snackbar'
import { Toast } from 'buefy/dist/components/toast'
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

  // roulette mode
  store.watch(
    ({ level, isRouletteMode }, { foundCount }) => ({ level, foundCount, isRouletteMode }),
    ({ level, foundCount, isRouletteMode }) => {
      // skip
      if (foundCount <= 1 || !isRouletteMode || level === foundCount) {
        return
      }

      if ((foundCount % (level / 3)) === 0) {
        store.commit(mutations.setIsLoading, true)

        setTimeout(() => {
          store.commit(mutations.setShuffleCount, Math.random() * 100)
          store.commit(mutations.setIsLoading, false)
        }, 1000)
      }
    }
  )

  // watch Easy Mode
  store.watch(
    ({ isEasyMode }) => isEasyMode,
    val => {
      val
        ? Toast.open({
          type: 'is-warning',
          message: 'Easy Mode is On. Your score will be lower than normal.'
        })
        : Toast.open({
          message: 'Easy Mode is Off, Your score returns to normal.'
        })
    }
  )

  // watch cards selections
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
