import React from 'react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught in ErrorBoundary:", error, errorInfo);
    this.setState({ errorInfo });
  }

  
        render() {
          if (this.state.hasError) {
            return (
              <div className="flex flex-col items-center justify-center h-screen bg-red-50 text-red-800 px-4 text-center">
                <h1 className="text-3xl font-bold mb-2">Something went wrong.</h1>
                <p className="mb-4 text-red-600 max-w-xl">
                  {this.state.error?.toString()}
                </p>
                <div className='flex gap-4 mt-4'>
                <button
                  onClick={() => window.location.reload()}
                  className="bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-6 rounded transition duration-200"
                >
                  Reload Page
                </button>
                <Link
                  to='/privacy-policy'
                  className=" bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded transition duration-200">
                  Go to Home 
                </Link>

                </div>
                
              </div>
            );
          }
        
          return this.props.children;
        }
}

export default ErrorBoundary;
