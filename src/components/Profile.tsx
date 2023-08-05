import Link from 'next/link'
import Image from 'next/image'

export default function Profile() {
  return (
    <Link href="/">
      <Image
        alt="me"
        src="/Me.jpg"
        width={48}
        height={48}
        className="rounded-full"
      />
    </Link>
  )
}
