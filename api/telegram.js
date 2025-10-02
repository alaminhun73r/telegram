// This script lives at api/telegram.js on Vercel
export default async function handler(request, response) {
  // Only allow POST requests
  if (request.method !== 'POST') {
    return response.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { botToken, chatId, message } = request.body;

    // Basic validation
    if (!botToken || !chatId || !message) {
      return response.status(400).json({ success: false, message: 'Missing parameters: botToken, chatId, or message.' });
    }

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;

    const apiResponse = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    const data = await apiResponse.json();
    
    // Send Telegram's response back to your PHP script
    response.status(200).json(data);

  } catch (error) {
    response.status(500).json({ success: false, message: 'An internal server error occurred.' });
  }
        }
