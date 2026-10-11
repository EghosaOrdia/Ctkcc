import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import { FileQuestion } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper px-4">
      <EmptyState
        icon={FileQuestion}
        title="This page does not exist"
        message="The link may be out of date. Head back to the home page."
        action={<Link to="/" className="btn-primary">Go to home page</Link>}
      />
    </div>
  );
}
