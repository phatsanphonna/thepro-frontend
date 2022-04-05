import React, { useLayoutEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import ReactPlayer from "react-player"
import { setLoading } from '@/redux/features/loading.feature'
import { PlayIcon } from '@heroicons/react/solid'

type Props = {
  source?: string
}

const VideoPlayer: React.FC<Props> = ({ source }) => {
  const dispatch = useDispatch()

  const breakpoint = 1024
  const [width, setWidth] = useState(breakpoint)

  const handleStartBuffer = () => {
    dispatch(setLoading(true))
  }

  const handleFinishBuffer = () => {
    dispatch(setLoading(false))
  }

  useLayoutEffect(() => {
    const handleResize = () => setWidth(window.innerWidth)

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
  return (
    <ReactPlayer
      url={source}
      controls={true}
      onBuffer={handleStartBuffer}
      onBufferEnd={handleFinishBuffer}
      playbackRate={10}
      light={true}
      stopOnUnmount={false}
      pip={true}
      playIcon={
        <PlayIcon
          className='w-20 text-white hover:w-24 transition-all drop-shadow'
        />
      }
      width='100%'
      config={{
        file: {
          attributes: {
            controlsList: 'nodownload'
          }
        }
      }}
      style={{ backgroundColor: 'black' }}
      height={width > breakpoint ? 720 : 360}
    />
  )
}

export default VideoPlayer