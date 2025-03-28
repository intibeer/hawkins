import { ImageResponse } from 'next/og'

// Remove the runtime export as it's automatically handled
// export const runtime = 'edge'

// Change the function name to avoid conflict with Next.js internal naming
export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 48,
          background: '#f8f7f2',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 40,
        }}
      >
        <img
          src="https://yourdomain.com/hawkings.png"
          alt="Dr. David R. Hawkins"
          width={200}
          height={200}
          style={{ borderRadius: '50%', marginBottom: 20 }}
        />
        <div style={{ color: '#5d4037', fontFamily: 'serif', marginBottom: 10 }}>
          Hawkins Consciousness Scale
        </div>
        <div style={{ color: '#9c6644', fontSize: 24, fontFamily: 'sans-serif' }}>
          Discover your consciousness level
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  )
} 