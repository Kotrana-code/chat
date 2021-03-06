const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');


// If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/calendar'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = 'token.json';


exports.addcalendar = async (req, res) => {
	// Load client secrets from a local file.
	fs.readFile('code_secret_client_991521714855-j9jf69vmp4t2tsoi6mk5db300pg89ne4.apps.googleusercontent.com.json', (err, content) => {
	  if (err) return console.log('Error loading client secret file:', err);
	  // Authorize a client with credentials, then call the Google Calendar API.
	  authorize(JSON.parse(content), createAnEvent , req.body, res);
	});
	
}


/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
function authorize(credentials, callback , body, res) {
  console.log(credentials);
  const {client_secret, client_id, redirect_uris} = credentials.web;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getAccessToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client,body, res);
  });
}

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
function getAccessToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error retrieving access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

/**
 * Lists the next 10 events on the user's primary calendar.
 * @param {google.auth.OAuth2} auth An authorized OAuth2 client.
 */
function listEvents(auth) {
  const calendar = google.calendar({version: 'v3', auth});
  calendar.events.list({
    calendarId: '5k4fst50jrq6d7me3b8rnf44fs@group.calendar.google.com',
    timeMin: (new Date()).toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const events = res.data.items;
    if (events.length) {
      console.log('Upcoming 10 events:');
      events.map((event, i) => {
        const start = event.start.dateTime || event.start.date;
        console.log(`${start} - ${event.summary}`);
      });
    } else {
      console.log('No upcoming events found.');
    }
  });
}

// Refer to the Node.js quickstart on how to setup the environment:
// https://developers.google.com/calendar/quickstart/node
// Change the scope to 'https://www.googleapis.com/auth/calendar' and delete any
// stored credentials.


function createAnEvent(auth,body, res){
	
    const calendar = google.calendar({version: 'v3', auth});
    var event = {
    'summary': body.summary,
    // 'location': '800 Howard St., San Francisco, CA 94103',
    'description': body.description,
    'start': body.start,
    'end': body.end,
    'recurrence': [
      'RRULE:FREQ=DAILY;COUNT=2'
    ],
    'attendees': body.attendees,
    'reminders': {
      'useDefault': false,
      'overrides': [
        {'method': 'email', 'minutes': 24 * 60},
        {'method': 'popup', 'minutes': 10},
      ],
    },
    'guestsCanSeeOtherGuests': false,
    'guestsCanInviteOthers': false,
    'guestsCanModify': false,
    'conferenceData': {
        'createRequest': {
          'requestId': 'meetingRequestId',
          'conferenceSolutionKey': {
            'type': 'hangoutsMeet',
          },
        },
      },

  };

   calendar.events.insert({
    auth: auth,
    calendarId: '5k4fst50jrq6d7me3b8rnf44fs@group.calendar.google.com',
    conferenceDataVersion: 1 ,
    resource: event,
    sendNotifications: true,
    sendUpdates: 'all'
  }, function(err, event) {
    if (err) {
      console.log('There was an error contacting the Calendar service: ' + err);
    	res.send({error: true, message: err.message});
      return;
    }
    res.send({error: false, hangoutLink : event.data.hangoutLink , htmlLink : event.data.htmlLink});
    console.log('Event created: %s', event.data.hangoutLink);
  });
}