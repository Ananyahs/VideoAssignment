// MainGrid.js
import React, { useState, useEffect } from 'react';
import '../styles/MainGrid.css';
//import { setSelectedVideo, setCurrentScreen } from '../App';

function MainGrid({handleCardClick}) {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    // Define the API endpoint URL
    const apiUrl = "https://fxojmluid9.execute-api.ap-south-1.amazonaws.com/Prod/api/engt/getfeeds_v1";
  
    // Define request headers
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
  
    // Make the API call
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
        // Update the 'videos' state with the response data
        console.log(data.data.Feeds);
        setVideos(data.data.Feeds); // Assuming 'data' is an array of video objects.
      })
      .catch((error) => {
        console.error("API call error:", error);
      });
  }, []);
  

  /*const handleCardClick = (video) => {
    // Handle card click to open the second screen
    // Pass 'video' data to the second screen component
  };*/

  /*const handleCardClick = (video) => {
    // Set the selected video in the state to be passed to the second screen
    setSelectedVideo(video);
  
    // Navigate to the second screen (you may use React Router or other navigation logic)
    setCurrentScreen('secondScreen');
  };*/
  

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <div className="video-card" key={video.EngagementPostId}>
          {/*<img
            className="thumbnail"
            src={video.Thumbnail_URL}
            alt={video.Thumbnail_Title}
      />*/}
          <video className="thumbnail" width={240} height={320}>
            <source src={video.Thumbnail_URL}></source>
          </video>
          <div className="video-info">
            <div className="engagement-post-id">{video.EngagementPostId}</div>
            <div className="thumbnail-title">{video.Thumbnail_Title}</div>
          </div>
          <button onClick={() => handleCardClick(video)}>View Details</button>
        </div>
      ))}
    </div>
  );
  
}

export default MainGrid;
