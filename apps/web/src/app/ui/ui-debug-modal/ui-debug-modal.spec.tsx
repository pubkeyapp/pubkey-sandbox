import { render } from '@testing-library/react'

import { UiDebugModal } from './ui-debug-modal'

describe('UiDebugModal', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiDebugModal data={'test'} />)
    expect(baseElement).toBeTruthy()
  })
})
