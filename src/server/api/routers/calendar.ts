import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { google } from "googleapis";
import { z } from "zod";

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

oauth2Client.setCredentials({
  refresh_token: process.env.REFRESH_TOKEN,
});

export const calendarRouter = createTRPCRouter({
  getAllEventCalendar: protectedProcedure.query((ctx) => {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const fechaInicio = new Date("2024-05-14T00:00:00Z");
    const fechaFin = new Date("2024-05-30T23:59:59Z");

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
