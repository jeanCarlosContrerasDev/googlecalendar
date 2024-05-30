import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { google } from "googleapis";

export const marketRouter = createTRPCRouter({

  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.db.product.findMany({
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
 
});
