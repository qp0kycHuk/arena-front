import { Link } from 'react-router-dom'
import { useAuth } from '@store/auth'
import { Button } from '@features/ui'
import { HeaderUser } from './HeaderUser'
import { BookmarkIcon, MenuIcon } from '@assets/icons/stroke'
import { ThemeToggle } from '@/components/ThemeToggle/ThemeToggle'
import { useSidebarContext } from '../Sidebar/SidebarContext'
import { Logo } from '@/components/Logo'

export function Header() {
  const { data: auth } = useAuth()
  const { toggleSidebar } = useSidebarContext()

  return (
    <header className="sticky top-0 z-20 flex items-center px-3 xl:px-8 py-2 bg-l3 shadow-sm ">
      <Button className="xl:hidden mr-1 sm:mr-3 -ml-2" size="sm" variant="text" onClick={toggleSidebar}>
        <MenuIcon className="text-2xl" />
      </Button>
      <Link to="/" className="mr-auto">
        <Logo className="h-[26px]" />
      </Link>

      <ThemeToggle className="mr-5 text-4xl" />

      <Button as={Link} to="favorites" variant="contur" size="sm" color="default">
        <BookmarkIcon className="text-2xl opacity-60" />
      </Button>
      {auth?.user ? (
        <HeaderUser />
      ) : (
        <Link to="login" className="mx-2">
          <Button variant="contur" size="sm" color="default">
            Login
          </Button>
        </Link>
      )}
    </header>
  )
}
