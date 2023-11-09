import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [displayLetter, setDisplayLetter] = useState('');

  const arr = [
    { letter: 'Q', sound: 'Heater-1', link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3', audioElement: null },
    { letter: 'W', sound: 'Heater-2', link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3', audioElement: null },
    { letter: 'E', sound: 'Heater-3', link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3', audioElement: null },
    { letter: 'A', sound: 'Heater-4_1', link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3', audioElement: null },
    { letter: 'S', sound: 'Heater-6', link: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3', audioElement: null },
    { letter: 'D', sound: 'Dsc_Oh', link: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3', audioElement: null },
    { letter: 'Z', sound: 'Kick_n_Hat', link: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3', audioElement: null },
    { letter: 'X', sound: 'RP4_Kick_1', link: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3', audioElement: null },
    { letter: 'C', sound: 'Cev_H2', link: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3', audioElement: null },
  ];

  const createPad = (arr) => (
    <div id="drum-machine" tabIndex='0' autoFocus onKeyDown={padBtnPlay}>
      {arr.map(({ letter, sound, link }, i) => (
        <div key={i} onClick={() => padPlay(sound)} id={sound} className="drum-pad">
          {letter}
          <audio className="clip" id={letter} ref={(audio) => arr[i].audioElement = audio} src={link}></audio>
        </div>
      ))}
      <div id="display">{displayLetter}</div>
    </div>
  );

  const updateStyle = (el) => {
    const originalBg = el.style.backgroundColor;
    el.style.backgroundColor = 'white';
    setTimeout(() => {
      el.style.backgroundColor = originalBg;
    }, 100);
  };

  const padPlay = (sound) => {
    const drumPad = arr.find(item => item.sound === sound);

    if (drumPad) {
      setDisplayLetter(sound);
      drumPad.audioElement.currentTime = 0;
      drumPad.audioElement.play();
      updateStyle(document.getElementById(sound));
    }
  };

  const padBtnPlay = (e) => {
    const pressedKey = e.key.toUpperCase();
    const drumPad = arr.find(item => item.letter === pressedKey);

    if (drumPad) {
      padPlay(drumPad.sound);
    }
  };

  useEffect(() => {
    const displayElement = document.getElementById("drum-machine");
    if (displayElement) {
      displayElement.focus();
    }
  }, []);

  return (
    <div className="App">
      {createPad(arr)}
    </div>
  );
}



export default App;
