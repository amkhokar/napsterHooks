import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
function useEndpoint(req) {
  const [res, setRes] = useState({
    data: null,
    complete: false,
    pending: false,
    error: false
  });
  useEffect(
    () => {
      setRes({
        data: null,
        pending: true,
        error: false,
        complete: false
      });
      axios(req)
        .then(res =>
          setRes({
            data: res.data,
            pending: false,
            error: false,
            complete: true
          }),
        )
        .catch(() =>
          setRes({
            data: null,
            pending: false,
            error: true,
            complete: true
          }),
        );
    },
    [req.url]
  );
  return res;
}
export default function App() {
  const napsterAPI = "https://api.napster.com/v2.2/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm";
  const allSongs = useEndpoint({
    method: "GET",
    url: napsterAPI
  });
  return (
    <div>
      <h1>Napster API Songs</h1>
      <div>
        <ul>
          {(allSongs.pending && 'Loading...') ||
            (allSongs.complete && allSongs.data.tracks.map((track, id) => (
              <li key={id}>
                Name: <b>{track.name}</b><br />
                Artist:<b>{track.artistName}</b><br />
                <audio src={track.previewURL} controls></audio>
              </li>
            )))
          }
        </ul>
      </div>
    </div>
  );
}