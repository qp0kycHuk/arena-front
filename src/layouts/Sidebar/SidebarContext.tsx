import { createContext, useContext } from 'react'
import { useToggle } from '@hooks/useToggle'

const SidebarContext = createContext<ISidebarContextValue>({} as ISidebarContextValue)

export const useSidebarContext = () => useContext(SidebarContext)

export function SidebarContextProvider({ children }: React.PropsWithChildren) {
  const [isOpen, toggleSidebar, openSidebar, closeSidebar] = useToggle(false)

  return (
    <SidebarContext.Provider
      value={{
        isOpen,
        toggleSidebar,
        openSidebar,
        closeSidebar,
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}

interface ISidebarContextValue {
  isOpen: boolean
  toggleSidebar(): void
  openSidebar(): void
  closeSidebar(): void
}
