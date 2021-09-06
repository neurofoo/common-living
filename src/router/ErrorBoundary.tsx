import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error(error, errorInfo);
  }

  render() {
    // @ts-ignore
    if (this.state.hasError) {
      return (
        <h1 className='min-h-screen text-center text-3xl font-bold'>
          Something went wrong.
        </h1>
      );
    }

    return this.props.children;
  }
}
