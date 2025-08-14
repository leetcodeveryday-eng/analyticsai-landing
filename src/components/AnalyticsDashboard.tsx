import React from 'react'

const AnalyticsDashboard: React.FC = () => {
  return (
    <div className="w-full h-full">
      <iframe 
        src="http://localhost:3003" 
        className="w-full h-full border-0"
        title="Plausible Analytics Dashboard"
        allow="fullscreen"
      />
    </div>
  )
}

export default AnalyticsDashboard 