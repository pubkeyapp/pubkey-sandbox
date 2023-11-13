import { render } from '@testing-library/react'

import { UiDebug } from './ui-debug'

describe('UiDebug', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiDebug data="data" />)
    expect(baseElement).toBeTruthy()
  })
})
