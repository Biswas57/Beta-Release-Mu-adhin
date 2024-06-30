import logo from './logo.svg';
import './App.css';
import { useSession, useSupabaseClient, useSessionContext } from '@supabase/auth-helpers-react';
import { useState, useEffect } from 'react';

function App() {
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [calendarId, setCalendarId] = useState("");
  const [calendars, setCalendars] = useState([]);

  const session = useSession(); // tokens for auth
  const supabase = useSupabaseClient(); // api calls to supabase
  const { isLoading } = useSessionContext();

  useEffect(() => {
    if (session) {
      getCalendars();
    }
  }, [session]);

  if (isLoading) {
    return <></>;
  }

  async function googleSignIn() {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        scopes: 'https://www.googleapis.com/auth/calendar',
      },
    });
    if (error) {
      alert("Error logging in to Google provider with Supabase");
      console.log(error);
    }
  }

  async function signOut() {
    await supabase.auth.signOut();
  }

  async function getCalendars() {
    try {
      const response = await fetch("https://www.googleapis.com/calendar/v3/users/me/calendarList", {
        method: "GET",
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to retrieve calendars');
      }

      const data = await response.json();
      setCalendars(data.items);
      console.log(data.items);
    } catch (error) {
      console.error('Error retrieving calendars:', error);
      alert("Error retrieving calendars, please try again.");
    }
  }

  async function createCalendarEvent() {
    try {
      const start = new Date(`${startDate}T${startTime}:00`);
      const end = new Date(`${endDate}T${endTime}:00`);
      const event = {
        'summary': eventName,
        'description': eventDescription,
        'start': {
          'dateTime': start.toISOString(),
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        },
        'end': {
          'dateTime': end.toISOString(),
          'timeZone': Intl.DateTimeFormat().resolvedOptions().timeZone,
        }
      };

      const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events`, {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${session.provider_token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      });

      if (!response.ok) {
        throw new Error('Failed to create event');
      }

      const data = await response.json();
      console.log(data);
      alert("Event created, check your Google Calendar.");
    } catch (error) {
      console.error('Error creating event:', error);
      alert("Error creating event, please try again.");
    }
  }

  console.log(`Start Date: ${startDate}, Start Time: ${startTime}`);
  console.log(`End Date: ${endDate}, End Time: ${endTime}`);
  console.log(`Event Name: ${eventName}, Event Description: ${eventDescription}`);

  return (
    <div className="App">
      <div className="container">
        {session ? (
          <>
            <h2>Hey there {session.user.user_metadata.full_name}!</h2>
            <p>Calendar ID</p>
            <select onChange={(e) => setCalendarId(e.target.value)} value={calendarId}>
              <option value="">Select Calendar</option>
              {calendars.map((calendar) => (
                <option key={calendar.id} value={calendar.id}>
                  {calendar.summary}
                </option>
              ))}
            </select>
            <p>Start</p>
            <div className="datetime-container">
              <input type="time" onChange={(e) => setStartTime(e.target.value)} value={startTime} />
              <input type="date" onChange={(e) => setStartDate(e.target.value)} value={startDate} />
            </div>
            <p>End</p>
            <div className="datetime-container">
              <input type="time" onChange={(e) => setEndTime(e.target.value)} value={endTime} />
              <input type="date" onChange={(e) => setEndDate(e.target.value)} value={endDate} />
            </div>
            <p>Event Name</p>
            <input type="text" onChange={(e) => setEventName(e.target.value)} value={eventName} />
            <p>Event Description</p>
            <input type="text" onChange={(e) => setEventDescription(e.target.value)} value={eventDescription} />
            <button onClick={createCalendarEvent}>Create Calendar Event</button>
            <hr className="separator" />
            <button onClick={signOut}>Sign Out</button>
          </>
        ) : (
          <>
            <h2>Beta Release: Mu'adhin</h2>
            <p>This app is basically my prototype for the Mu'adhin prayer calendar app I'm working on.</p>
            <hr className="separator" />
            <h3>Sign in to use this Calendar App.</h3>
            <button className="google-button" onClick={googleSignIn}>
              <img src="/google-logo.png" alt="Google logo" className="google-logo" />
              Sign in with Google
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
