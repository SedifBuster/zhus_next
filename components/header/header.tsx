'use client'
import useRoutes from "../hooks/useRoutes"
import { Button } from "../ui/button"

export
  default function Header(
) {

  const routes = useRoutes()
  console.log(routes)

  return (
    <div className="flex border-b shadow-[0_50px_60px_-15px_rgba(0,0,0,0.07)] pl-10 pr-10 pb-2">
      <div>
        <h1 className="text-2xl">Журнал учета нежелательных событий при осуществлении медицинской деятельности</h1>
        <div
          className="
            mb-32
            mt-6
            grid
            text-center
            lg:mb-0
            lg:w-full
            lg:grid-cols-4
            lg:text-left
          "
        >
          {
            routes.map(route => {
              return <a
                href={route.href}
                className="
                  group
                  rounded-lg
                  border
                  border-transparent
                  px-5 py-4
                  transition-colors
                  hover:border-green-500
                  hover:bg-green-100
                  hover:dark:border-neutral-700
                  hover:dark:bg-neutral-800/30
                "
              >
                <h2 className="text-xl">
                  {route.label}{" "}
                  <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
                    -&gt;
                  </span>
                </h2>
              </a>
            })
          }
        </div>
      </div>
      {/*login in portal*/}
      <div className="flex flex-col">
       {/* <input placeholder="login" />
        <input placeholder="password"/>*/}
        <Button>войти в аккаунт</Button>
      </div>

    </div>
  )
}