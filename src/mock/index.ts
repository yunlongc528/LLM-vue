import Mock from 'mockjs'
import { caseMocks, recommendMocks, mindMapMocks, authMocks } from './api/user'

const mocks = [...caseMocks, ...recommendMocks, ...mindMapMocks, ...authMocks]

export function setupMock() {
    mocks.forEach((mock) => {
        Mock.mock(new RegExp(mock.url), mock.method, mock.response)
    })
    console.log('[Mock] Mock 数据已加载')
}
