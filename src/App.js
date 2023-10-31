// App.js
import React from 'react';
import {useState} from 'react';
import MainGrid from './components/MainGrid';
import SecondScreen from './components/SecondScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('grid');
  const [selectedVideo, setSelectedVideo] = useState(null);

   const handleCardClick = (video) => {
    setSelectedVideo(video);
    setCurrentScreen('secondScreen');
  };

  const goBackToGrid = () => {
    setCurrentScreen('grid');
    setSelectedVideo(null);
  };

  return (
    <div>
      {currentScreen === 'grid' && <MainGrid handleCardClick={handleCardClick} />}
      {currentScreen === 'secondScreen' && (
        <SecondScreen videoData={selectedVideo} goBackToGrid={goBackToGrid} />
      )}
    </div>
  );
}

export default App;
