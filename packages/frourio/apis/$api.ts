/* eslint-disable */
import { AspidaClient, BasicHeaders } from 'aspida'
import { Methods as Methods0 } from './index'
import { Methods as Methods1 } from './texts/index'
import { Methods as Methods2 } from './texts/sample/index'
import { Methods as Methods3 } from './users/index'
import { Methods as Methods4 } from './users/_userId@number/index'

const api = <T>(client: AspidaClient<T>) => {
  const prefix = (client.baseURL === undefined ? '' : client.baseURL).replace(/\/$/, '')

  return {
    texts: {
      sample: {
        put: (option: { data: Methods2['put']['reqBody'], config?: T }) =>
          client.fetch<Methods2['put']['resBody']>(prefix, '/texts/sample', 'PUT', option).json(),
        $put: async (option: { data: Methods2['put']['reqBody'], config?: T }) =>
          (await client.fetch<Methods2['put']['resBody']>(prefix, '/texts/sample', 'PUT', option).json()).data
      },
      get: (option: { query: Methods1['get']['query'], config?: T }) =>
        client.fetch<Methods1['get']['resBody']>(prefix, '/texts', 'GET', option).text(),
      $get: async (option: { query: Methods1['get']['query'], config?: T }) =>
        (await client.fetch<Methods1['get']['resBody']>(prefix, '/texts', 'GET', option).text()).data,
      put: (option?: { config?: T }) =>
        client.fetch<void>(prefix, '/texts', 'PUT', option).send(),
      $put: async (option?: { config?: T }) =>
        (await client.fetch<void>(prefix, '/texts', 'PUT', option).send()).data
    },
    users: {
      _userId: (val0: number) => ({
        get: (option?: { config?: T }) =>
          client.fetch<Methods4['get']['resBody']>(prefix, `/users/${val0}`, 'GET', option).json(),
        $get: async (option?: { config?: T }) =>
          (await client.fetch<Methods4['get']['resBody']>(prefix, `/users/${val0}`, 'GET', option).json()).data
      }),
      get: (option?: { config?: T }) =>
        client.fetch<Methods3['get']['resBody']>(prefix, '/users', 'GET', option).json(),
      $get: async (option?: { config?: T }) =>
        (await client.fetch<Methods3['get']['resBody']>(prefix, '/users', 'GET', option).json()).data,
      post: (option: { data: Methods3['post']['reqBody'], config?: T }) =>
        client.fetch<void>(prefix, '/users', 'POST', option).send(),
      $post: async (option: { data: Methods3['post']['reqBody'], config?: T }) =>
        (await client.fetch<void>(prefix, '/users', 'POST', option).send()).data
    },
    get: (option?: { query?: Methods0['get']['query'], config?: T }) =>
      client.fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, '', 'GET', option).json(),
    $get: async (option?: { query?: Methods0['get']['query'], config?: T }) =>
      (await client.fetch<Methods0['get']['resBody'], BasicHeaders, Methods0['get']['status']>(prefix, '', 'GET', option).json()).data,
    post: (option: { data: Methods0['post']['reqBody'], query: Methods0['post']['query'], config?: T }) =>
      client.fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, '', 'POST', option, 'FormData').json(),
    $post: async (option: { data: Methods0['post']['reqBody'], query: Methods0['post']['query'], config?: T }) =>
      (await client.fetch<Methods0['post']['resBody'], BasicHeaders, Methods0['post']['status']>(prefix, '', 'POST', option, 'FormData').json()).data
  }
}

export type ApiInstance = ReturnType<typeof api>
export default api
