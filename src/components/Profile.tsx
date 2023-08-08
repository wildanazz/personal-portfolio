import Link from 'next/link'
import Image from 'next/image'

export default function Profile() {
  return (
    <Image
      alt="me"
      src={'https://wildanazz.blob.core.windows.net/profile/Me.JPG'}
      width={48}
      height={48}
      className="rounded-full"
    />
  )
}
