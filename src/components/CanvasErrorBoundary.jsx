import { Component } from 'react'

/**
 * If the 3D scene throws (driver loss, OOM, shader error), swap in the
 * static fallback instead of crashing the whole page.
 */
export default class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }

  static getDerivedStateFromError() {
    return { failed: true }
  }

  componentDidCatch(error) {
    // eslint-disable-next-line no-console
    console.warn('[Trivara] 3D scene unavailable, using static fallback.', error)
  }

  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}
