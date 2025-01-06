import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { DashboardLayout } from '@toolpad/core/DashboardLayout';
import { PageContainer } from '@toolpad/core/PageContainer';
import AuthorizeView from '../components/AuthorizedView';



export default function Layout() {


  return (
    <AuthorizeView>
      <DashboardLayout>
        <PageContainer>
          <Outlet />
          {/* <AuthorizedUser value="email" /> */}
        </PageContainer>
      </DashboardLayout>
    </AuthorizeView>
  );
}
