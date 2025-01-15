"use client"

import Link from "next/link"
import useRoutes from "../hooks/useRoutes"
import { Button } from "../ui/button"
import HeaderNavItem from "./headerNavItem"

export
  default function Header(
) {
  const routes = useRoutes()
// pl-10 pr-10 pb-2
  return (
    <div className="flex border-b shadow-[0_50px_60px_-15px_rgba(0,0,0,0.07)]">
      <div className="container mx-auto flex p-2">
        <div>
          <Link href={"/"}><h1 className="text-2xl">Журнал учета нежелательных событий при осуществлении медицинской деятельности</h1></Link>
          <div
            className="
            mt-2
            grid
            gap-2
            text-center
            lg:mb-0
            lg:w-full
            lg:grid-cols-4
            lg:text-left
          "
        >
          {
            routes.map(route => {
              return <HeaderNavItem key={route.label} route={route} />
            })
          }
        </div>
      </div>
      {/*login in portal*/}
      <div className="flex flex-col">
        {/*<Button variant={'default'}>войти в аккаунт</Button>*/}
      </div>
      </div>
    </div>
  )
}