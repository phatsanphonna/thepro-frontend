import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { httpGet } from '@/libs/http'
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

type Props = {
  source?: string
}

type PlayerSettings = {
  volume: number
}

const VideoPlayer: React.FC<Props> = ({ source }) => {
  const breakpoint = 1024
  const [width, setWidth] = useState(breakpoint)

  const [videoWatermark, setVideoWatermark] = useState(false)
  const [playerSettings, setPlayerSettings] = useState<PlayerSettings>()
  const [contentURL, setContentURL] = useState('')

  const videoReference = useRef(null);
  const playerReference = useRef(null);

  useEffect(() => {
    const handleScreenshotKeyup = (e: KeyboardEvent) => {
      if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('Screenshots disabled!');
      }
    }

    const handleScreenshotKeydown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'p') {
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('Screenshots disabled!');
      } else if (e.shiftKey && e.key === 's') {
        e.cancelBubble = true;
        e.preventDefault();
        e.stopImmediatePropagation();
        alert('Screenshots disabled!');
      }

    }
    window.addEventListener('keyup', handleScreenshotKeyup)
    window.addEventListener('keydown', handleScreenshotKeydown)

    return () => {
      window.removeEventListener('keyup', handleScreenshotKeyup)
      window.removeEventListener('keydown', handleScreenshotKeydown)
    }
  }, [])

  useEffect(() => {
    if (!source) return

    // Initializing video.js player
    if (!playerReference.current) {
      const videoElement = videoReference.current;
      if (!videoElement) return;

      let playerRef = playerReference.current as any

      playerRef = videojs(videoElement, options, () => {
        videojs.log('Video player is ready');
      });
    }
  }, [source, videoReference]);

  useEffect(() => {
    const player = playerReference.current as any;

    return () => {
      if (player) {
        player.dispose();
        playerReference.current = null;
      }
    };
  }, [playerReference]);

  const options = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [{
      src: 'http://localhost:7802/api/file/640df14df0781c2c6c3369dc',
      type: 'video/mp4'
    }]
  };


  useLayoutEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])


  return (
    <div
      style={{
        backgroundColor: 'black',
        width: '100%',
        height: width > breakpoint ? 720
          : width > breakpoint - 256 ? 480
            : 240
      }}
    >
      <i
        className='absolute text-white m-5 md:m-10 opacity-50'
      >
        THE PRO TUTOR
      </i>
      <div data-vjs-player>
        <video ref={videoReference} className='video-js vjs-big-playcentered' />
      </div>
    </div>
  )
}

export default VideoPlayer