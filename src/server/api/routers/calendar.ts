import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { google } from "googleapis";
import { z } from "zod";

// const oauth2Client = new google.auth.OAuth2(
//   "1009735315859-14et33k43nercj155g0j4mrp4293l09s.apps.googleusercontent.com",
//   "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",
// );

// oauth2Client.setCredentials({
//   refresh_token:"1//048HlgKPtV1j6CgYIARAAGAQSNwF-L9Ir5P_tVxyV5U0FeYqSOyAAxWMQKWyH7FoFGO9cVg9JYtYVcgJPj7Id_U4K0xSy2giXAjQ",
// });

export const calendarRouter = createTRPCRouter({

  getAllEventCalendar: protectedProcedure.query((ctx) => {

    const oauth2Client = new google.auth.OAuth2(
      "1009735315859-14et33k43nercj155g0j4mrp4293l09s.apps.googleusercontent.com",      
      "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",
    );
    
    oauth2Client.setCredentials({
      refresh_token:"1//04-BmGdHIZtW_CgYIARAAGAQSNwF-L9IrviefkMuuVMhm7UiNVj8-cJ030DPSsCTMrZFBJQZjgOfLclJz1XinoeNcz1G9x0VZiIo",
    });
    
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const fechaInicio = new Date("2024-05-14T00:00:00Z");
    const fechaFin = new Date("2024-07-30T23:59:59Z");

    const getAllCalendar = calendar.events.list({
      calendarId: "primary",
      timeMin: fechaInicio.toISOString(),
      timeMax: fechaFin.toISOString(),
      maxResults: 10,
      singleEvents: true,
      orderBy: "startTime",
    });

    return getAllCalendar;
  }),

  createCalendarEvent: publicProcedure
    .input(
      z.object({ title: z.string(), startTime: z.date(), endTime: z.date() }),
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // Obtener el usuario de la sesión;
        // const userId = ctx.session.user.id;
        // const account = await ctx.db.account.findFirst({
        //   where: { userId },
        // });

        // const accesstoken= account?.access_token

        // // Verificar si se encuentra el token de acceso en la cuenta
        // const accessToken = account?.access_token;

        const oauth2Client = new google.auth.OAuth2(
          "1009735315859-14et33k43nercj155g0j4mrp4293l09s.apps.googleusercontent.com",      
          "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",
        );
        
        oauth2Client.setCredentials({
          refresh_token:"1//04-BmGdHIZtW_CgYIARAAGAQSNwF-L9IrviefkMuuVMhm7UiNVj8-cJ030DPSsCTMrZFBJQZjgOfLclJz1XinoeNcz1G9x0VZiIo",
        });

        const calendar = google.calendar({ version: "v3", auth: oauth2Client });

        const startTimeISO = input.startTime.toISOString();
        const endTimeISO = input.endTime.toISOString();

        const event = {
          summary: input.title,
          start: { dateTime: startTimeISO },
          end: { dateTime: endTimeISO },
        };

        const response = await calendar.events.insert({
          calendarId: "primary",
          requestBody: event,
        });
        

        console.log("Evento creado:", response.data);

        return response.data;
      } catch (error) {
        console.error("Error al crear el evento en el calendario:", error);
        return {
          success: false,
          message: "Error al crear el evento en el calendario.",
          error: error,
        };
      }
    }),
});
