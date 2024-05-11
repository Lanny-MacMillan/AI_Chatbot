'use client';
import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/nav/navigation-menu';

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'OpenAI Chat',
    href: '/text-generation',
    description: "Have a conversation or find answers with OpenAI's GPT-4.",
  },
  {
    title: 'Dalle-3 Image Generator',
    href: '/image-generator',
    description: 'Generate images with Dalle·3 from OpenAI',
  },
  {
    title: 'OpenAI Vision',
    href: '/vision',
    description: "Ask OpenAI's Vision to analyze or give insights on images",
  },
  {
    title: 'Text-to-Speech',
    href: '/text-to-speech',
    description: "Use OpenAI's TTS-1 to turn text into life like spoken audio",
  },
];

export function NavigationMenuAi() {
  return (
    <>
      <div
        style={{
          borderWidth: 0,
          borderBottom: '5px solid',
          borderImage: 'linear-gradient(to right,#7427f7,#5be9b9, #bc3ed3) 30',
          zIndex: '100',
        }}
        className="bg-custom-purple-200 p-2 z-50 flex justify-between flex-row"
      >
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>About</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-5 w-[350px] md:w-[400px] lg:w-[500px] lg:grid-cols-[1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className=" select-none flex-col  rounded-md bg-gradient-to-b from-muted/50 to-mutedno-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div
                          style={{
                            borderWidth: 0,
                            borderBottom: '3px solid',
                            borderImage:
                              'linear-gradient(to right,#7427f7,#5be9b9, #bc3ed3) 30',
                          }}
                          className="bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text mb-6 mt-1 text-lg font-customBlack "
                        >
                          Ai Toolbox
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground  font-customSemiBold ">
                          The AI Toolbox harnesses the power of four cutting-edge AI
                          models in a single, user-friendly platform to cater to all
                          your needs efficiently.
                          <br />
                          Enjoy seamless integration of cutting-edge technologies for
                          diverse tasks such as speech synthesis, image recognition,
                          advanced language processing, and creative image generation
                          in one unified platform.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>The Toolbox</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[350px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
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
        <object
          className="flex h-7 self-center flex-end mx-4"
          type="image/svg+xml"
          data="/smallToolbox.svg"
        >
          small-logo-svg
        </object>
      </div>
    </>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<'a'>,
  React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground bg-custom-purple-100',
            className,
          )}
          {...props}
        >
          <div
            style={{
              borderWidth: 0,
              borderBottom: '3px solid',
              borderImage: 'linear-gradient(to right,#7427f7,#5be9b9, #bc3ed3) 30',
            }}
            className=" text-base font-customBlack leading-none mt-2 bg-gradient-to-r from-custom-purple-600 to-custom-magenta-300 inline-block text-transparent bg-clip-text"
          >
            {title}
          </div>
          <p className="line-clamp-2 text-sm font-customSemiBold leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
