import axios from "axios";
import { convertScanRangeToNewerThan } from "../../../utils/convertScanRangeToNewerThan.js";

export const fetchEmailsFromSender = async (
  accessToken,
  senderEmail,
  scanRange,
  isUnread = true
) => {
  const newerThan = convertScanRangeToNewerThan(scanRange);

  if (!newerThan) {
    throw new Error("Invalid scan range");
  }

  const query = `from:${senderEmail}${
    isUnread ? " is:unread" : ""
  } newer_than:${newerThan}`;

  try {
    const response = await axios.get(
      `https://gmail.googleapis.com/gmail/v1/users/me/messages`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        params: {
          q: query,
        },
      }
    );

    const messages = response.data.messages || [];
    const emails = [];

    for (const message of messages) {
      const emailResponse = await axios.get(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      const emailData = emailResponse.data;
      const payload = emailData.payload;
      let messageContent = "";

      if (
        payload.mimeType === "text/plain" ||
        payload.mimeType === "text/html"
      ) {
        messageContent = Buffer.from(payload.body.data, "base64").toString(
          "utf-8"
        );
      } else if (payload.parts) {
        payload.parts.forEach((part) => {
          if (part.mimeType === "text/plain" || part.mimeType === "text/html") {
            messageContent += Buffer.from(part.body.data, "base64").toString(
              "utf-8"
            );
          }
        });
      }

      emails.push({ ...emailData, messageContent });

      // Mark email as read
      await axios.post(
        `https://gmail.googleapis.com/gmail/v1/users/me/messages/${message.id}/modify`,
        {
          removeLabelIds: ["UNREAD"],
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
    }

    return emails;
  } catch (error) {
    console.error("Failed to fetch emails", error);
    throw error;
  }
};
