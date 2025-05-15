import { Button } from '../ui/button';

const ErrorBoundary = () => {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column h-100">
      <h1>Oops! Something went wrong.</h1>
      <span className="d-flex align-items-center">
        <Button variant="default" className="mr-2" onClick={() => (window.location.href = '/')}>
          Go back
        </Button>
      </span>
    </div>
  );
};

export default ErrorBoundary;
