import React from 'react'

export default class ErrorHandler extends React.Component {
  state = {
    error: undefined,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
  }

  render() {
    return this.state.error ? (
      <div>Error has occurred</div>
    ) : (
      this.props.children
    )
  }
}
