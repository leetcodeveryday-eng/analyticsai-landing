import React from 'react'

const PostHogServer: React.FC = () => {
  return (
    <div className="w-full h-full">
      <iframe 
        src="http://localhost:8000" 
        className="w-full h-full border-0"
        title="PostHog Analytics Server"
        allow="fullscreen"
      />
    </div>
  )
}

export default PostHogServer 