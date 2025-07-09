import Image from 'next/image'

export default function SoccerballPage() {
  return (
      <Image
        src="/soccerball.jpg"
        alt="Soccerball"
        width={800}
        height={600}
        style={{ maxWidth: '100%', height: 'auto' }}
        priority
      />
  )
} 