import Image from 'next/image'

export default function SoccerballPage() {
  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh',
      backgroundColor: 'white'
    }}>
      <Image
        src="/soccerball/soccerball.jpg"
        alt="Soccerball"
        width={800}
        height={600}
        style={{ maxWidth: '100%', height: 'auto' }}
        priority
      />
    </div>
  )
} 