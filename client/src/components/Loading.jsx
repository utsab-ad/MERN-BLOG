import React from 'react'

const Loading = () => {
  return (
    <div className="w-50 h-50 top-0 left-0 z-0 flex justify-center items-center mx-auto">
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      width="10vw"
      height="10vh"
    >
      <circle
        cx="20"
        cy="20"
      />
      <path
        d="M38 20a18 18 0 0 1-18 18"
        fill="none"
        stroke="black"
        strokeWidth="4"
        strokeLinecap="round" 
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          from="0 20 20"
          to="360 20 20"
          dur="0.8s"
          repeatCount="indefinite"
        />
      </path>
    </svg>
  </div>
  
  )
}

export default Loading