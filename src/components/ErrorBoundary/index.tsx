import { Component, ErrorInfo } from 'react';
import type { ErrorBoundaryProps } from '../../types';

class ErrorBoundary extends Component<ErrorBoundaryProps> {
  state = { hasError: false };

  static getDerivedStateFromError = () => ({ hasError: true });

  componentDidCatch = (error: Error, info: ErrorInfo) =>
    console.warn(error, info);

  render = () => {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  };
}

export default ErrorBoundary;
