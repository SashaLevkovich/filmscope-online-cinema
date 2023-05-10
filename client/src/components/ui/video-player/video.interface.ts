export interface IVideoPlayer {
  videoSource: string
  slug: string
  isPublic: boolean
}

export interface IVideoElement extends HTMLVideoElement {
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
  webkitRequestFullscreen?: () => void
}
