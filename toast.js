// imports
import { Random } from 'meteor/random'

let toasts = {}

/**
 * Show toasts and track by category
 * @see https://materializecss.com/toasts.html
 * @param {Array} categoryTags - Categories matching this toast
 * @param {String} html - HTML or text to render inside the toast
 * @param {Object} messageData - Translation data for the translation
 * @param {Object} options - Materialize options for the toast
 * @returns {Number} The id of the toast
 * @alias showToast
 * @alias materialize-toast:show
 **/
export const showToast = (categoryTags, html, messageData, options) => {

  // normalise display length
  const displayLength = options&&options.displayLength?options.displayLength:5000

  // normalise classes
  const classes = options&&options.classes?options.classes:''

  // define callback
  const completeCallback = () => {

    // call the callback
    if (options&&_.isFunction(options.completeCallback)) {
      options.completeCallback()
    }

    // delete toast if it is still being tracked
    if (toasts[id]) {delete toasts[id]}
  }

  // show the toast
  M.toast({html, displayLength, classes, completeCallback})

  // track the toast
  const id = Random.id()
  toasts[id] = {categoryTags, html, messageData, options}

  // return undefined
  return id
}

// close toasts by tags
const _closeToastsByTags = (tags) => {

  // get the toasts to close
  const toastsToClose = _.filter(toasts, (toast) => {
    for (let tag of tags) {
      if (_.contains(toast.categoryTags, tag)) {
        return true
      }
    }
    return false
  })
  Log.log(['debug', 'toast'], `toastsToClose`, toastsToClose.length)

  // close each toast
  _.forEach(toastsToClose, (toast) => {

    // remove each toast matching the message of this toast
    _.chain($('.toast'))
        .filter((qToast) => {
          Log.log(['debug', 'toast'], `qToast.innerText:`, qToast.innerText)
          Log.log(['debug', 'toast'], `toast.html:`, toast.html)
          if(qToast.innerText === toast.html) {
            return true
          }
          return false
        })
        .each((toastElement) => {
          // console.log(`Closing toast`, toastElement)
          const toastInstance = M.Toast.getInstance(toastElement)
          // console.log(`toastInstance`, toastInstance)
          toastInstance.dismiss()
        })

    // stop tracking toast
    delete toast[toast.id]
  })

  // return undefined
  return undefined
}

/**
 * Close all toasts matching tags
 * @param {Array} tags - The tags for the toasts to close
 * @returns {undefined}
 * @alias materialize-toast:show
 * @alias closeToastsByTags
 **/
export const closeToastsByTags = _.throttle(_closeToastsByTags, 1000)

/**
 * @module materialize-toast
 **/
export default {
  show: showToast,
  closeTags: _closeToastsByTags
}
