import Link from 'next/link'
import Image from 'next/image'

export default function Profile() {
  return (
    <Link href="/">
      <Image
        alt="Picture of me"
        src="https://wildanazz.azureedge.net/profile/Me.webp"
        width={48}
        height={48}
        sizes="(max-width: 48px) 100vw, (max-width: 48px) 50vw, 100vw"
        className="rounded-full"
        loading="eager"
      />
    </Link>
  )
}
