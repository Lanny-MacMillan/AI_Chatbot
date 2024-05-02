"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/nav/navigation-menu"

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Text Generation",
    href: "/text-generation",
    description:
      "OpenAI's text generation models have been trained to understand natural language, code, and images.",
  },
  {
    title: "Image Generator",
    href: "/image-generator",
    description:
      "Generate images with DALL·E from OpenAI",
  },
  {
    title: "Open AI Vision",
    href: "/vision",
    description:
      "Vision is best at answering general questions about what is present in the images.",
  },
  {
    title: "Text-to-Speech",
    href: "/text-to-speech",
    description: "Turn text into lifelike spoken audio.",
  },
]

export function NavigationMenuAi() {
  return (
    <>
      <div
        style={{
          borderWidth: 0,
          borderBottom: '4px solid',
          borderImage: 'linear-gradient(to right,#7427f7,#5be9b9, #bc3ed3) 30',
          zIndex: '100'
        }}
      className="bg-custom-purple-200 p-2 z-50">

    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                    href="/"
                  >
                    <div className="mb-2 mt-4 text-lg font-medium">
                      Ai Toolbox
                    </div>
                    <p className="text-sm leading-tight text-muted-foreground">
                      Beautiful and simply designed components built with Radix UI and
                      Tailwind CSS for this AI Toolbox.
                    </p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/introduction" title="Introduction">
                Get introduced to OpenAi and how to use it to you're advantage.
              </ListItem>
              <ListItem href="/documentation" title="Documentation">
                Take a look at the OpenAI Documention.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Ai Tools</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
              {components.map((component) => (
                <ListItem
                  key={component.title}
                  title={component.title}
                  href={component.href}
                >
                  {component.description}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
      </NavigationMenu>
      </div>
    </>
  )
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-custom-purple-100",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  )
})
ListItem.displayName = "ListItem"
