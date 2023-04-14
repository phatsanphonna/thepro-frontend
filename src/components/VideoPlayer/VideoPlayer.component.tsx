import { useEffect } from 'react'
import ReactPlayer from 'react-player'

type Props = {
  source?: string
}

const VideoPlayer: React.FC<Props> = ({ source }) => {
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

  return (

    <ReactPlayer
      url={'https://vimeo.com/' + source}
      controls={true}
      config={{
        file: {
          attributes: {
            controlsList: 'nodownload'
          }
        }
      }}
      pip={true}
      width="100%"
      height="100%"
      playsinline={true}
    />
  )
}

export default VideoPlayer