// Adapted from klab_academy_node_mastery. Styles are inline and the layout uses tables
// because many email clients (Gmail, Outlook) ignore or strip <style> blocks.
export const welcomeEmailTemplate = (name: string) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Welcome</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #eef3fb; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #eef3fb; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(30, 64, 175, 0.08);">

            <tr>
              <td style="background-color: #1e40af; padding: 40px 32px; text-align: center;">
                <p style="margin: 0 0 8px; color: #bfdbfe; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">Node Auth Mailer</p>
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Welcome aboard, ${name}!</h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 32px; color: #1f2937; font-size: 16px; line-height: 1.6;">
                <p style="margin: 0 0 16px;">Hi ${name},</p>
                <p style="margin: 0 0 24px;">Thank you for registering with us. We're excited to have you on board, and your account is ready to use.</p>

                <p style="margin: 0 0 8px; font-weight: bold; color: #1e3a8a;">What's next?</p>
                <ul style="margin: 0 0 24px; padding-left: 20px; color: #374151;">
                  <li style="margin-bottom: 6px;">Log in with your email and password</li>
                  <li style="margin-bottom: 6px;">Keep your password safe and never share it</li>
                  <li>Forgot it? Request a reset code anytime</li>
                </ul>

                <p style="margin: 0;">Cheers,<br /><strong style="color: #1e40af;">The Node Auth Mailer Team</strong></p>
              </td>
            </tr>

            <tr>
              <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0 0 4px;">If you didn't create this account, you can safely ignore this email.</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} Node Auth Mailer. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;