const { google } = require('googleapis');

// Function to send an email using the Gmail API
const sendEmail = async (email, subject, Otp) => {

    const message=`Your OTP for Employee MAnagement Service:${Otp}`
  try {
    // Load the credentials from a JSON file (downloaded from the Google Cloud Console)
    const credentials = require('./path/to/credentials.json');
    
    // Set up the OAuth2 client
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

    // Set the access token (you'll need to obtain this through the OAuth2 authorization flow)
    const accessToken = 'YOUR_ACCESS_TOKEN';
    oAuth2Client.setCredentials({ access_token: accessToken });

    // Create the Gmail API client
    const gmail = google.gmail({ version: 'v1', auth: oAuth2Client });

    // Compose the email
    const encodedEmail = Buffer.from(
      `From: YOUR_EMAIL\r\nTo: ${email}\r\nSubject: ${subject}\r\n\r\n${message}`
    ).toString('base64');
    const raw = encodedEmail.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

    // Send the email
    const response = await gmail.users.messages.send({
      userId: 'me',
      requestBody: {
        raw: raw
      }
    });

    console.log('Email sent:', response.data);
  } catch (error) {
    console.error('Failed to send email:', error);
  }
};

module.exports = { sendEmail };
