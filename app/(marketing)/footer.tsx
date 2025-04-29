import { Button } from "@/components/ui/button";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="hidden lg:block h-20 w-full border-t-2 border-slate-200 p-2">
      <div className="max-w-screen-lg mx-auto flex items-center justify-evenly h-full">
        <Button size="lg" variant="ghost">
          <Image
            src="/html.png"
            alt="HTML"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
            HTML
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/css.png"
            alt="CSS"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
            CSS
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/js.png"
            alt="JavaScript"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
            JavaScript
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/python.png"
            alt="Python"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
            Python
        </Button>
        <Button size="lg" variant="ghost">
          <Image
            src="/php.png"
            alt="PHP"
            height={32}
            width={40}
            className="mr-4 rounded-md"
          />
            PHP
        </Button>
      </div>
    </footer>
  );
};
