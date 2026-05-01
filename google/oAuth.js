import { google } from "googleapis";

const auth = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

auth.setCredentials({ refresh_token: REFRESH_TOKEN });

const gmail = google.gmail({ version: "v1", auth });

const res = await gmail.users.messages.list({
  userId: "me",
  maxResults: 5,
});