// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error capturado por ErrorBoundary:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="container vh-100 d-flex justify-content-center align-items-center">
          <div className="text-center">
            <h1 className="display-4 text-danger">Algo salió mal</h1>
            <p className="lead">Lo sentimos, ha ocurrido un error inesperado.</p>
            <button className="btn btn-primary" onClick={() => window.location.reload()}>
              Recargar la página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;