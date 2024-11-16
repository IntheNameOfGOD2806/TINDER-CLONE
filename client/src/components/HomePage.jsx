import React, { useMemo, useRef, useState } from 'react';
import TinderCard from 'react-tinder-card';

// A component to render individual user cards
const UserCardWrapper = ({ name, url }) => {
  return (
    <div
      style={{ backgroundImage: `url(${url})` }}
      className="card bg-cover bg-center flex min-h-96 min-w-96 items-end p-4"
    >
      <h3 className="text-white text-xl font-bold">{name}</h3>
    </div>
  );
};

const HomePage = () => {
  const db = [
    {
      name: 'Richard Hendricks',
      url: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      name: 'Erlich Bachman',
      url: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      name: 'Monica Hall',
      url: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      name: 'Jared Dunn',
      url: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
    {
      name: 'Dinesh Chugtai',
      url: 'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(db.length - 1);
  const [lastDirection, setLastDirection] = useState(null);
  const currentIndexRef = useRef(currentIndex);

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  );

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val);
    currentIndexRef.current = val;
  };

  const canGoBack = currentIndex < db.length - 1;
  const canSwipe = currentIndex >= 0;

  const swiped = (direction, nameToDelete, index) => {
    setLastDirection(direction);
    updateCurrentIndex(index - 1);
  };

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current);
    if (currentIndexRef.current >= idx) {
      childRefs[idx].current.restoreCard();
    }
  };

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      await childRefs[currentIndex].current.swipe(dir); // Swipe the card!
    }
  };

  const goBack = async () => {
    if (!canGoBack) return;
    const newIndex = currentIndex + 1;
    updateCurrentIndex(newIndex);
    await childRefs[newIndex].current.restoreCard();
  };

  return (
    <div className="home-wrapper w-full h-screen flex flex-col items-center justify-center backdrop-filter backdrop-blur-lg">
      <h1 className="text-2xl font-bold mb-4">React Tinder Card</h1>
      <div className="cardContainer relative w-80 h-96 ">
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className="swipe absolute w-full h-full"
            key={character.name}
            onSwipe={(dir) => swiped(dir, character.name, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <UserCardWrapper name={character.name} url={character.url} />
          </TinderCard>
        ))}
          {lastDirection && (
        <h2 key={lastDirection} className="infoText mt-4 text-lg text-gray-700 absolute -bottom-32">
          You swiped {lastDirection}
        </h2>
      )}
      </div>
      {/* <div className="buttons flex justify-around mt-6 w-64">
        <button
          className={`btn ${!canSwipe ? 'bg-gray-300' : 'bg-red-500 text-white'} px-4 py-2 rounded`}
          onClick={() => swipe('left')}
          disabled={!canSwipe}
        >
          Swipe Left
        </button>
        <button
          className={`btn ${!canGoBack ? 'bg-gray-300' : 'bg-blue-500 text-white'} px-4 py-2 rounded`}
          onClick={() => goBack()}
          disabled={!canGoBack}
        >
          Undo
        </button>
        <button
          className={`btn ${!canSwipe ? 'bg-gray-300' : 'bg-green-500 text-white'} px-4 py-2 rounded`}
          onClick={() => swipe('right')}
          disabled={!canSwipe}
        >
          Swipe Right
        </button>
      </div> */}
    
    </div>
  );
};

export default HomePage;
