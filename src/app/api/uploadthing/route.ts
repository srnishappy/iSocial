import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from './core';
import prisma from '@/lib/prisma';

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
});
