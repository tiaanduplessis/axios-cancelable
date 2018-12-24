import axios, { Cancel } from 'axios'
import MockAdapter from 'axios-mock-adapter'
import axiosCancel from '..'

axiosCancel(axios, {
  debug: false,
})

const url = 'http://reddit.com'

const mock = new MockAdapter(axios, { delayResponse: 200 })

mock.onGet(url).reply(200, {
  users: [
    { id: 1, name: 'John Smith' },
  ],
})

describe('axios cancel', () => {
  test('normal request', () => axios.get(url)
    .then((res) => {
      const { data } = res
      expect(data.users).toBeTruthy()
      return data
    }).catch((error) => {
      expect(error).toBeNull()
    }))

  test('request with requestId', () => {
    const requestId = 'request_id'
    return axios.get(url, {
      requestId,
    })
      .then((res) => {
        const { data } = res
        expect(data.users).toBeTruthy()
        return data
      }).catch((error) => {
        expect(error).toBeNull()
      })
  })

  test('cancel a single request with requestId', () => {
    const requestId = 'single-request'
    const promise = axios.get(url, {
      requestId,
    })
      .catch(((error) => {
        expect(axios.isCancel(error)).toBeTruthy()
      }))

    setTimeout(() => {
      axios.cancel(requestId)
    }, 100)

    return promise
  })

  test('validate that cancellation err is of type axios.Cancel', () => {
    const requestId = 'cancel-error'
    const promise = axios.get(url, {
      requestId,
    })
      .catch((error) => {
        expect(error).toBeInstanceOf(Cancel)
      })

    setTimeout(() => {
      axios.cancel(requestId)
    }, 100)

    return promise
  })
})
