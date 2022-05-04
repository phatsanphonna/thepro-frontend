import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import videojs from "video.js"
import 'video.js/dist/video-js.css'
import 'videojs-watermark/dist/videojs-watermark.css';

import { httpGet } from '@/libs/http'

type Props = {
  source?: string
}

type PlayerSettings = {
  volume: number
}

const VideoPlayer: React.FC<Props> = ({ source }) => {
  const breakpoint = 1024
  const [width, setWidth] = useState(breakpoint)

  const videoRef = useRef(null)
  const playerRef = useRef(null)

  const [videoWatermark, setVideoWatermark] = useState(false)

  const getCurrentPlayerSettings = (): PlayerSettings => {
    const playerSettings = localStorage.getItem('player')

    if (playerSettings) {
      return JSON.parse(playerSettings)
    } else {
      const defaultSettings = { volume: 1 }

      localStorage.setItem('player', JSON.stringify(defaultSettings))

      return defaultSettings
    }
  }

  let playerSettings: PlayerSettings

  const handleVolumeChange = () => {
    const vref = videoRef.current as any

    playerSettings = { ...playerSettings, volume: vref.volume }

    localStorage.setItem('player', JSON.stringify(playerSettings))
  }

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await httpGet(`/file/${source}`)
      return data
    }

    const player = playerRef.current as any

    if (!source) return

    if (!player) {
      const videoElement = videoRef.current as any

      if (!videoElement) return

      fetchData()
        .then((data) => {
          playerSettings = getCurrentPlayerSettings()

          console.log(playerSettings);

          console.log('videoelement volume', videoElement.volume);

          videoElement.volume = playerSettings.volume

          console.log('videoelement volume', videoElement.volume);

          playerRef.current = videojs(videoElement, {
            autoplay: false,
            controls: true,
            liveui: true,
            controlBar: {
              durationDisplay: true,
              currentTimeDisplay: true,
              remainingTimeDisplay: true,
              timeDivider: true
            },
            sources: [{
              // src: data.contentURL,
              src: 'https://vjs.zencdn.net/v/oceans.mp4',
              type: 'video/mp4'
            }],
          }) as any

          const pRef = playerRef.current as any

          videoElement.volume = playerSettings.volume

          setVideoWatermark(true)
        })
    }

    return () => {
      if (player) {
        player.dispose()
        playerRef.current = null
      }
    }
  }, [source])

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
      data-vjs-player
      style={{
        backgroundColor: 'black',
        width: '100%',
        height: width > breakpoint ? 720
          : width > breakpoint - 256 ? 480
            : 240
      }}
    >
      <video
        ref={videoRef}
        className='video-js vjs-big-play-centered'
        onContextMenu={(e) => e.preventDefault()}
        onVolumeChange={handleVolumeChange}
      />
      {
        source && videoWatermark &&
        /* eslint-disable-next-line */
        <i style={{
          right: '5%',
          top: '5%',
        }}
          className='select-none text-white not-italic text-base md:text-2xl absolute opacity-50 h-10'
        >
          THE PRO TUTOR
        </i>
      }
    </div>
  )
}

export default VideoPlayer