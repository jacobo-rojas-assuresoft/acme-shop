import withAuth from '../components/AuthRoute';

function ProtectedPage() {
  return (
    <div>
      <h1>Contenido protegido</h1>
    </div>
  );
}

export default withAuth(ProtectedPage);
