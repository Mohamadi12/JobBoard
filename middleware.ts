import { authkitMiddleware } from '@workos-inc/authkit-nextjs';

export default authkitMiddleware({
    redirectUri: process.env.WORKOS_REDIRECT_URI,
});

export const config = {
    matcher: [
      '/',
      '/new-listing',
      '/new-listing/:orgId*',
      '/new-company',
      '/jobs/:orgId*',
      '/jobs/edit/:jobId*',
      '/show/:jobId*',
    ]
  };
