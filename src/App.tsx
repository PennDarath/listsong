import { useEffect, useRef, useState } from "react";
import "./App.css";
import {
  FiPause,
  FiPlay,
  FiRepeat,
  FiShuffle,
  FiSkipBack,
  FiSkipForward,
} from "react-icons/fi";
import { Slider } from "@mui/material";

const data = [
  {
    id: 1,
     name: "Bloody Mary",
    url: "/assets/spotifydown.com - Bloody Mary.mp3",
  },
  {
    id: 2,
    name: "Naruto Opening 3",
    url: "/assets/spotifydown.com - 青春狂騒曲.mp3",
  },
  {
    id: 3,
    name: "Sparkle ost. Your Name",
    url: "/public/assets/spotifydown.com - Sparkle - movie ver..mp3",
  },
  {
    id: 4,
    name: "Love, Maybe",
    url: "/assets/spotifydown.com - Love, Maybe.mp3",
  },
  {
    id: 5,
    name: "One Day",
    url: "/assets/spotifydown.com - One Day.mp3",
  },
  {
    id: 6,
    name: "Sweet",
    url: "/assets/spotifydown.com - Sweet.mp3",
  },

  {
    id: 7,
    name: "ฉบับปรับปรุง",
    url: "/assets/spotifydown.com - ฉบับปรับปรุง.mp3",
  },

];

function App() {
  const [song, setSong] = useState(data[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [percent, setPercent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [shufflee, setShufflee] = useState(false);
  const [repeat, setRepeat] = useState(false);

  const audioEl = useRef<HTMLAudioElement>(null);

  const shuffle = () => {
    setShufflee(!shufflee);
  };

  const repeatSong = () => {
    setRepeat(!repeat);
  };

  useEffect(() => {
    if (repeat) {
      audioEl.current?.setAttribute("loop", "true");
    } else {
      audioEl.current?.removeAttribute("loop");
    }
  }, [repeat, song]);

  const skipShuffle = () => {
    const index = Math.floor(Math.random() * data.length);
    console.log(index);
    setSong(data[index]);
  };

  const loadingTimes = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const allTimes = (time: number) => {
    return (
      Math.floor(time / 60) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  };

  const onChange = (e: any) => {
    audioEl.current!.currentTime = (e.target.value * duration) / 100;
    setPercent(e.target.value);
  };

  const previosSong = () => {
    const index = data.indexOf(song);
    if (index === 0) {
      setSong(data[data.length - 1]);
      setIsPlaying(true);
      console.log(data[data.length - 1]);
    } else {
      setSong(data[index - 1]);
      setIsPlaying(true);
      console.log(data[index - 1]);
    }
  };

  const skipSong = () => {
    const index = data.indexOf(song);
    if (index === data.length - 1) {
      setSong(data[0]);
      setIsPlaying(true);
    } else {
      setSong(data[index + 1]);
      setIsPlaying(true);
      console.log(data[index + 1]);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioEl.current?.play();
    } else {
      audioEl.current?.pause();
    }
  }, [isPlaying, song]);

  const toggleAudio = () => {
    if (audioEl.current?.paused) {
      audioEl.current?.play();
      isPlaying ? setIsPlaying(false) : setIsPlaying(true);
    } else {
      audioEl.current?.pause();
      isPlaying ? setIsPlaying(false) : setIsPlaying(true);
    }
  };

  const chooseSong = (id: number) => {
    const found = data.find((song) => song.id === id);
    if (found) {
      setSong(found);
    }
    setIsPlaying(true);
  };

  const getCurrentDuration = (e: any) => {
    const percent = ((e.currentTarget.currentTime / duration) * 100).toFixed(0);
    setPercent(+percent);
    setCurrentTime(e.currentTarget.currentTime);
  };

  //  audioEl.current?.addEventListener('ended', skipSong) when event ended happened will skip to next song

  return (
    <div
      className=" w-screen h-screen bg-black opacity-80 pt-5 "
      style={{ fontFamily: "monospace" }}
    >
      <div className="grid justify-center">
        <div className="grid pb-5 justify-center items-center  w-fit text-3xl text-white bg-black rounded-lg">
          <div className="border-4 border-white w-full pb-8 pt-5 gap-x-5 px-5 rounded-lg">
            <div className="lg:w-[40vw] md:w-[40vw] w-[80vw] overflow-hidden  rounded-lg">
              <p className="text-xl text-center pb-4 animate-x">
                {song.name}
              </p>
              <div className="flex text-base items-center justify-between gap-x-4">
                <div>{loadingTimes(currentTime)}</div>
                <Slider
                  style={{ width: "70%", height: "12px" ,color: 'white'}}
                  onChange={onChange}
                  value={percent}
                />
                <div>{allTimes(duration)}</div>
              </div>
              <div className="flex justify-between ">
                <button
                  style={{ color: shufflee ? "#E90064" : "" }}
                  className="text-red text-xl"
                  onClick={shuffle}
                >
                  <FiShuffle />
                </button>
                <button
                  className="hover:scale-110 duration-300 active:scale-x-150"
                  onClick={previosSong}
                >
                  <FiSkipBack />
                </button>
                <audio
                  onEnded={shufflee ? skipShuffle : skipSong}
                  src={song.url}
                  ref={audioEl}
                  onLoadedData={(e) => {
                    setDuration(e.currentTarget.duration);
                  }}
                  onTimeUpdate={getCurrentDuration}
                />
                <button
                  className="hover:scale-110 duration-300 active:scale-x-150 text-3xl"
                  onClick={toggleAudio}
                >
                  {isPlaying ? <FiPause /> : <FiPlay />}
                </button>
                <button
                  className="hover:scale-110 duration-300 active:scale-x-150"
                  onClick={shufflee ? skipShuffle : skipSong}
                >
                  <FiSkipForward />
                </button>
                <button
                  className="text-red text-xl active:text-[#E90064]"
                  style={{ color: repeat ? "red" : "" }}
                  onClick={() => repeatSong()}
                >
                  <FiRepeat />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="text-center">
          {data.map((s) => (
            <div key={s.id}>
              <button onClick={() => chooseSong(s.id)}>
                <p
                  className="py-2 max-sm:text-[15px] max-sm:font-bold font-extrabold mb-5 text-xl hover:scale-110  active:scale-150 px-4 duration-300 rounded"
                  style={{
                    color: song.id === s.id ? "black" : "white",
                    backgroundColor: song.id === s.id ? "white" : "",
                    borderColor: song.id === s.id ? "white" : "",

                    borderRadius: song.id === s.id ? "10px" : "",
                  }}
                >
                  {s.name}
                </p>

              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
