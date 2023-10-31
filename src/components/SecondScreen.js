// SecondScreen.js
import React, { useState, useEffect } from 'react';

function SecondScreen({ videoData, goBackToGrid }) {
  const [volumeMuted, setVolumeMuted] = useState(false);
  const [contentUrl, setContentUrl] = useState('');

  useEffect(() => {
    // Define the API endpoint URL with the EngagementPostId parameter
    console.log(videoData.EngagementPostId);
    //const apiUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=${videoData.EngagementPostId}`;
    const apiUrl = `https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=2326`;
    //https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getPostContent?eid=2326

    const headers = {
      "x-api-key": "MXqO3cDcr492OTPGZZAot7akPvLmfKbA4bKt5Ryr",
      "x-tenant-key": "BLAASH1122",
    };
  
    // Define the request body
    const requestBody = JSON.stringify({
      Index: 1,
      ContentType: [2],
      ProductCategory: [],
      PlayListCode: "XL7OXUUX_638264173348576143",
      IsTagged: false,
    });

    // Make the API call to fetch content URL
    fetch(apiUrl, {
      method: "POST", // You may need to adjust the HTTP method based on your API's requirements.
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: requestBody,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        if (data.length > 0) {
          // Assuming data is an array, update 'contentUrl' with the received URL
          setContentUrl(data[0].Url);
        } else {
          console.error("No content found for the given EngagementPostId");
        }
      })
      .catch((error) => {
        console.error("API call error:", error);
      });
  }, [videoData.EngagementPostId]);
  

  const handleVolumeToggle = () => {
    setVolumeMuted(!volumeMuted);
  };

  return (
    <div className="second-screen">
      <video
        src={contentUrl}
        controls
        autoPlay
        muted={volumeMuted}
        className="video-player"
      ></video>
      <button onClick={handleVolumeToggle}>
        {volumeMuted ? "Unmute" : "Mute"}
      </button>
      <button onClick={goBackToGrid}>Go Back</button>
    </div>
  );
  
}

export default SecondScreen;
