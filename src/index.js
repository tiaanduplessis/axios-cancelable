import { CancelToken } from 'axios'

class RequestManager {
  constructor(options = {}) {
    this.options = options
    this.requests = new Map(options.initial || [])
  }

  add(requestId, cancelFn) {
    this.log(`Adding request ${requestId}`)

    if (this.requests.has(requestId)) {
      this.cancel(requestId, `Duplicate request ${requestId}`)
    }

    this.requests.set(requestId, cancelFn)
  }

  remove(requestId) {
    this.log(`Removing request ${requestId}`)
    this.requests.delete(requestId)
  }

  cancel(requestId, reason = '') {
    if (this.requests.has(requestId)) {
      this.requests.get(requestId)(reason)
      this.remove(requestId)
      this.log(`Cancelled request ${requestId}`)
    }
  }

  cancelAll(reason = '') {
    for (const requestId in this.requests.keys()) { // eslint-disable-line guard-for-in,no-restricted-syntax,max-len
      this.cancel(requestId, reason)
    }
  }

  log(message) {
    const { debug, logger } = this.options
    const prefix = 'axios-cancelable: '

    if (debug) {
      logger(`${prefix}${message}`)
    }
  }
}

export default function patchAxios(axios, { debug = false, logger = console.log } = {}) { // eslint-disable-line no-console,max-len
  const requestManager = new RequestManager({ debug, logger })

  axios.interceptors.request.use((config) => {
    const { requestId } = config

    if (requestId) {
      const source = CancelToken.source()
      config.cancelToken = source.token
      requestManager.add(requestId, source.cancel)
    }

    return config
  })

  axios.interceptors.response.use((response) => {
    const { requestId } = response.config
    if (requestId) {
      requestManager.remove(requestId)
    }

    return response
  })

  axios.cancel = (requestId, reason) => {
    if (requestId) {
      requestManager.cancel(requestId, reason)
    }
  }

  axios.cancelAll = (reason) => {
    requestManager.cancelAll(reason)
  }
}
