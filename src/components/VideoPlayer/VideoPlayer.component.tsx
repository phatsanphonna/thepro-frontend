import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { httpGet } from '@/libs/http'
import { getAccessToken } from '@/libs/auth';

import ReactPlayer from 'react-player'

type Props = {
  source?: string
}

type PlayerSettings = {
  volume: number
}

const playerConfig = {
  controls: true,
  pip: true
}

const VideoPlayer: React.FC<Props> = ({ source }) => {
  const breakpoint = 1024
  const [width, setWidth] = useState(breakpoint)

  const [videoWatermark, setVideoWatermark] = useState(false)
  const [playerSettings, setPlayerSettings] = useState<PlayerSettings>()
  const [contentURL, setContentURL] = useState('')

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

  const fetchData = async () => {
    const { data } = await httpGet(`/file/watch/${source}`, {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`
      }
    })
    return data
  }

  useEffect(() => {
    if (!source) {
      return
    }

    fetchData()
      .then((data) => {
        setPlayerSettings(getCurrentPlayerSettings())
        setContentURL(`https://vimeo.com/${data.contentURL}`)
        setVideoWatermark(true)
      })
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
      <ReactPlayer
        url={contentURL}
        {...playerConfig}
        width='100%'
        height='100%'
      />
    </div>
  )
}

export default VideoPlayer