import { useState } from "react";
import { useMemo } from 'react';
import { useAppSelector, useAppDispatch } from "../../store/store";

import "./styles.scss";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { changeMoodStatus } from "../../store/slice/moodSlice";

import ReactAudioPlayer from "react-audio-player";
import { changeRainStatus } from "../../store/slice/rainSlice";
import { changeVolume } from "../../store/slice/changeVolumeSlice";
import CountDownTimer from "../CountDownTimer";
import TodoList from "../TodoList";
import { IModifierBoardProps } from "../../types/interface";
import { RootState } from "../../store/store";

const ModifierBoard = ({
  seconds,
  minutes,
  hours,
  isRunning,
  pause,
  resume,
  restart,
  setTimerHandler,
  setTimerStart,
  timerStart,
}: IModifierBoardProps) => {
  const dispatch = useAppDispatch();
  const moodData = useAppSelector((state: RootState) => state.mood);
  const rainData = useAppSelector((state: RootState) => state.rain);
  const volumeData = useAppSelector((state: RootState) => state.volume);

  const { rainValue } = rainData;
  const { moodMode } = moodData;
  const { volumeValue } = volumeData;

  const [openMood, setOpenMood] = useState<boolean>(false);
  const [openFocus, setOpenFocus] = useState<boolean>(false);
  const NoisePlayer = ({ src, volume }:any) => (
    <ReactAudioPlayer preload='auto' autoPlay src={src} loop volume={volume / 100} crossOrigin="anonymous" />
  );
  

  const [cityTraffic, setCityTraffic] = useState<number>(0);
  const [cityRain, setCityRain] = useState<number>(0);
  const [fireplace, setFireplace] = useState<number>(0);
  const [snow, setSnow] = useState<number>(0);
  const [summerStorm, setSummerStorm] = useState<number>(0);
  const [fan, setFan] = useState<number>(0);
  const [forestNight, setForestNight] = useState<number>(0);
  const [wave, setWave] = useState<number>(0);
  const [wind, setWind] = useState<number>(0);
  const [people, setPeople] = useState<number>(0);
  const [river, setRiver] = useState<number>(0);
  const [rainForest, setRainForest] = useState<number>(0);

  const rainSliderHandler = (e: any) => {
    const { value } = e.target;
    if (value > 0) {
      dispatch(changeRainStatus({ currentStatus: "clear", value: cityRain }));
    } else if (value === 0) {
      dispatch(changeRainStatus({ currentStatus: "rain", value: 0 }));
    }
    setCityRain(value);
  };
  const openFocusHandler = () => {
    setOpenFocus(!openFocus);
    setOpenMood(false);
  };

  const openMoodHandler = () => {
    setOpenMood(!openMood);
    setOpenFocus(false);
  };

  const changeMoodHandler = (e: any) => {
    dispatch(changeMoodStatus(e.target.id));
  };

  const changeVolumeHandler = (e: any) => {
    dispatch(changeVolume(e.target.value));
  };
  const cityTrafficAudio = useMemo(() => (
    <NoisePlayer src='./assets/music/city_traffic.mp3' volume={cityTraffic} />
  ), [cityTraffic]);

  const fireplaceAudio = useMemo(() => (
    <NoisePlayer src='./assets/music/fireplace.mp3' volume={fireplace} />
  ), [fireplace]);

  const rainCityAudio = useMemo(() => (
    <NoisePlayer src='./assets/music/rain_city.mp3' volume={cityRain} />
  ), [cityRain]);

  const snowAudio = useMemo(() =>(
    <NoisePlayer src='./assets/music/snow.mp3' volume={snow} />
  ), [snow]);

  const fanAudio = useMemo(() =>(
    <NoisePlayer src='./assets/music/fan.mp3' volume={fan} />
  ), [fan]);

  const forestNightAudio = useMemo(() => (
    <NoisePlayer src='./assets/music/forest_night.mp3' volume={forestNight} />
  ), [forestNight]);

  const wavesAudio = useMemo(() =>(
    <NoisePlayer src='./assets/music/waves.mp3' volume={wave} />
  ), [wave]);

  const windAudio = useMemo(() => (
    <NoisePlayer src='./assets/music/wind.mp3' volume={wind} />
  ), [wind]);

  const peopleAudio = useMemo(() =>(
    <NoisePlayer src='./assets/music/people_talk_inside.mp3' volume={people} />
  ), [people]);

  const riverAudio = useMemo(() =>(
    <NoisePlayer src='./assets/music/river.mp3' volume={river} />
  ), [river]);

  const rainForestAudio = useMemo(() =>(
    <NoisePlayer src='./assets/music/rain_forest.mp3' volume={rainForest} />
  ), [rainForest]);

  const summerStormAudio = useMemo(() =>(
    <NoisePlayer src='./assets/music/summer_storm.mp3' volume={summerStorm} />
  ), [summerStorm]);

  return (
    <>
      {!openMood && (
        <div>
          {cityTrafficAudio}
          {fireplaceAudio}
          {rainCityAudio}
          {snowAudio}
          {fanAudio}
          {forestNightAudio}
          {wavesAudio}
          {windAudio}
          {peopleAudio}
          {riverAudio}
          {rainForestAudio}
          {summerStormAudio}
          
        </div>
      )}
      <div
        className={
          `modifier ` + (openMood && "mood ") + (openFocus && " focus ")
        }
      >
        <div className='modifier__icon'>
          <div className={`icon ` + (openMood && "active")}>
            <i onClick={openMoodHandler} className='fas fa-sliders-h fa-2x'></i>
          </div>
          {openMood && (
            <div className='modifierBox'>
              <h4>Mood</h4>
              <div className='options'>
                <div
                  id='sleep'
                  onClick={changeMoodHandler}
                  className={`item ` + (moodMode === "sleep" ? "active" : "")}
                >
                  <i id='sleep' className='fas fa-moon fa-2x'></i>
                  <span id='sleep'>Sleep</span>
                </div>
                <div
                  id='jazzy'
                  onClick={changeMoodHandler}
                  className={`item ` + (moodMode === "jazzy" ? "active" : "")}
                >
                  <i id='jazzy' className='fas fa-guitar fa-2x'></i>
                  <span id='jazzy'>Jazzy</span>
                </div>
                <div
                  id='chill'
                  onClick={changeMoodHandler}
                  className={`item ` + (moodMode === "chill" ? "active" : "")}
                >
                  <i id='chill' className='fas fa-coffee fa-2x'></i>
                  <span id='chill'>Chill</span>
                </div>
              </div>
              <div className='volume'>
                <Stack
                  spacing={2}
                  direction='row'
                  sx={{ mb: 1 }}
                  alignItems='center'
                >
                  <i className='fas fa-volume-down fa-lg'></i>
                  <Slider
                    className='volume-slider'
                    value={volumeValue}
                    onChange={changeVolumeHandler}
                  />
                  <i className='fas fa-volume-up fa-lg'></i>
                </Stack>
              </div>
              <h5>Background Noise</h5>
              <div className='backgroundNoise'>
                <div className='noise-option'>
                  <p>City traffic</p>
                  <NoisePlayer src='./assets/music/city_traffic.mp3' volume={cityTraffic} />
                  <Slider
                    className='slider'
                    value={cityTraffic}
                    onChange={(e: any) => setCityTraffic(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>City rain</p>
                  <NoisePlayer src='./assets/music/rain_city.mp3' volume={cityRain} />
                  <Slider
                    className='slider'
                    value={rainValue}
                    onChange={rainSliderHandler}
                  />
                </div>
                <div className='noise-option'>
                  <p>Fireplace</p>
                  <NoisePlayer src='./assets/music/fireplace.mp3' volume={fireplace} />
                  <Slider
                    className='slider'
                    value={fireplace}
                    onChange={(e: any) => setFireplace(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>Snow</p>
                  <NoisePlayer src='./assets/music/snow.mp3' volume={snow} />
                  <Slider
                    className='slider'
                    value={snow}
                    onChange={(e: any) => setSnow(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>Summer Storm</p>
                  <NoisePlayer src='./assets/music/summer_storm.mp3' volume={summerStorm} />
                  <Slider
                    className='slider'
                    value={summerStorm}
                    onChange={(e: any) => setSummerStorm(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>Fan</p>
                  <NoisePlayer src='./assets/music/fan.mp3' volume={fan} />
                  <Slider
                    className='slider'
                    value={fan}
                    onChange={(e: any) => setFan(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>Forest Night</p>
                  <NoisePlayer src='./assets/music/forest_night.mp3' volume={forestNight} />
                  <Slider
                    className='slider'
                    value={forestNight}
                    onChange={(e: any) => setForestNight(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>Wave</p>
                  <NoisePlayer src='./assets/music/waves.mp3' volume={wave} />
                  <Slider
                    className='slider'
                    value={wave}
                    onChange={(e: any) => setWave(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>Wind</p>
                  <NoisePlayer src='./assets/music/wind.mp3' volume={wind} />
                  <Slider
                    className='slider'
                    value={wind}
                    onChange={(e: any) => setWind(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>People</p>
                  <NoisePlayer src='./assets/music/people_talk_inside.mp3' volume={people} />
                  <Slider
                    className='slider'
                    value={people}
                    onChange={(e: any) => setPeople(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>River</p>
                  <NoisePlayer src='./assets/music/river.mp3' volume={river} />
                  <Slider
                    className='slider'
                    value={river}
                    onChange={(e: any) => setRiver(e.target.value)}
                  />
                </div>
                <div className='noise-option'>
                  <p>Rain Forest</p>
                  <NoisePlayer src='./assets/music/rain_forest.mp3' volume={rainForest} />
                  <Slider
                    className='slider'
                    value={rainForest}
                    onChange={(e: any) => setRainForest(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        <div className='modifier__icon'>
          <div className={"icon " + (openFocus && "active")}>
            <i
              onClick={openFocusHandler}
              className='fas fa-book-reader fa-2x'
            ></i>
          </div>
        </div>
        {openFocus && (
          <div className='modifierBox'>
            <h4>Focus Mode</h4>
            <CountDownTimer
              seconds={seconds}
              minutes={minutes}
              hours={hours}
              isRunning={isRunning}
              pause={pause}
              resume={resume}
              restart={restart}
              setTimerHandler={setTimerHandler}
              setTimerStart={setTimerStart}
              timerStart={timerStart}
            />
            <h4>To-Do list</h4>
            <TodoList />
          </div>
        )}
      </div>
    </>
  );
};

export default ModifierBoard;
