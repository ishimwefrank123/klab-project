export const orderConfirmationTemplate = (name: string, orderId: string, totalAmount: number) => `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Confirmation</title>
  </head>
  <body style="margin: 0; padding: 0; background-color: #eef3fb; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #eef3fb; padding: 32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(30, 64, 175, 0.08);">

            <tr>
              <td style="background-color: #1e40af; padding: 40px 32px; text-align: center;">
                <p style="margin: 0 0 8px; color: #bfdbfe; font-size: 13px; letter-spacing: 2px; text-transform: uppercase;">KLab E-Commerce</p>
                <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">Order Confirmed! 🎉</h1>
              </td>
            </tr>

            <tr>
              <td style="padding: 32px; color: #1f2937; font-size: 16px; line-height: 1.6;">
                <p style="margin: 0 0 16px;">Hi ${name},</p>
                <p style="margin: 0 0 24px;">Thank you for your order! We have successfully received it and are now processing it.</p>

                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 24px;">
                    <tr>
                        <td style="padding: 16px;">
                            <p style="margin: 0 0 8px; color: #475569; font-size: 14px;"><strong>Order ID:</strong> <span style="color: #1e40af;">${orderId}</span></p>
                            <p style="margin: 0; color: #475569; font-size: 14px;"><strong>Total Amount:</strong> <span style="font-weight: bold; color: #0f172a;">$${totalAmount.toFixed(2)}</span></p>
                        </td>
                    </tr>
                </table>

                <p style="margin: 0 0 24px;">We will send you another update once your order has shipped.</p>

                <p style="margin: 0;">Cheers,<br /><strong style="color: #1e40af;">The KLab E-Commerce Team</strong></p>
              </td>
            </tr>

            <tr>
              <td style="background-color: #f8fafc; border-top: 1px solid #e2e8f0; padding: 20px 32px; text-align: center; color: #64748b; font-size: 12px; line-height: 1.5;">
                <p style="margin: 0 0 4px;">If you have any questions, simply reply to this email.</p>
                <p style="margin: 0;">&copy; ${new Date().getFullYear()} KLab E-Commerce. All rights reserved.</p>
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
`;
