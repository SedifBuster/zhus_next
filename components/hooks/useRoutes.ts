import { useMemo, useState } from "react";
import { usePathname } from "next/navigation"

const useRoutes = () => {
  const pathname = usePathname()

  const [onRoutes] = useState([
    {
      label: "Форма записи",
      href: '/form',
      active: pathname === '/form',
    },
    {
      label: "Журнал учета событий",
      href: '/table',
      active: pathname === '/table'
    }
    ])

    const routes = useMemo(() => onRoutes, [pathname])

    return routes
}

export default useRoutes