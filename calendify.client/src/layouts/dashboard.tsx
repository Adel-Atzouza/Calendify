import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
// import AuthorizeView, { AuthorizedUser } from '../components/AuthorizedView';
import { useSession } from '../SessionContext';

export default function Layout() {
  const location = useLocation();
  const { session } = useSession();

  if (!session) {
    // Add the `callbackUrl` search parameter
    const redirectTo = `/sign-in?callbackUrl=${encodeURIComponent(location.pathname)}`;

    return <Navigate to={redirectTo} replace />;
  }

  return (
    // <AuthorizeView>
      <DashboardLayout>
        <PageContainer>
          <Outlet />
          {/* <AuthorizedUser value="email" /> */}
        </PageContainer>
      </DashboardLayout>
    // </AuthorizeView>
  );
}
