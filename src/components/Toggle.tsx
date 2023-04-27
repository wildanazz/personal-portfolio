import { motion } from 'framer-motion'
import { IoMenu, IoClose } from 'react-icons/io5'

type ToggleProps = {
  isOpen: boolean
  handleToggle(): void
}

export default function Toggle({ isOpen, handleToggle }: ToggleProps) {
  return (
    <motion.div
      className="flex justify-center items-center absolute top-[24px] right-[24px] rounded-[50px] cursor-pointer active:scale-90"
      role="menuitem"
      tabIndex={0}
      onClick={handleToggle}
    >
      {isOpen ? (
        <IoClose className="text-white text-5xl rounded-[50px]" />
      ) : (
        <IoMenu className="text-black text-5xl rounded-[50px]" />
      )}
    </motion.div>
  )
}
