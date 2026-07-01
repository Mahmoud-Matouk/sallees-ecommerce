'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { appConfig } from '@/core/constants/app';
import {
  Heart,
  LayoutDashboard,
  Menu,
  Package,
  ShoppingCart,
  Star,
  Tag,
  Truck,
  User,
  Zap,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { CartPanel } from '@/features/cart/components/CartPanel';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

interface MenuItem {
  title: string;
  url: string;
  description?: string;
  icon?: React.ReactNode;
  items?: MenuItem[];
}

interface NavbarProps {
  logo?: {
    url: string;
    src: string;
    alt: string;
    title: string;
  };
  menu?: MenuItem[];
  mobileExtraLinks?: {
    name: string;
    url: string;
  }[];
  auth?: {
    login: {
      text: string;
      url: string;
    };
    signup: {
      text: string;
      url: string;
    };
  };
}

const Navbar = ({
  logo = {
    url: '/',
    src: '/logo.svg',
    alt: `${appConfig.name} logo`,
    title: appConfig.name,
  },
  menu = [
    { title: 'Home', url: '/' },
    {
      title: 'Shop',
      url: '/',
      items: [
        {
          title: 'All Products',
          description: 'Browse our complete collection of products',
          icon: <Package className="size-5 shrink-0" />,
          url: '/',
        },
        {
          title: 'New Arrivals',
          description: 'Check out the latest additions to our store',
          icon: <Zap className="size-5 shrink-0" />,
          url: '/',
        },
        {
          title: 'Best Sellers',
          description: 'Our most popular products loved by customers',
          icon: <Star className="size-5 shrink-0" />,
          url: '/',
        },
        {
          title: 'Deals & Offers',
          description: 'Special discounts and limited-time offers',
          icon: <Tag className="size-5 shrink-0" />,
          url: '/',
        },
      ],
    },
    {
      title: 'Account',
      url: '#',
      items: [
        {
          title: 'My Orders',
          description: 'Track and manage your orders',
          icon: <Truck className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Wishlist',
          description: 'Your saved items and favorites',
          icon: <Heart className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: 'Dashboard',
          description: 'View analytics and manage your store',
          icon: <LayoutDashboard className="size-5 shrink-0" />,
          url: '/dashboard',
        },
        {
          title: 'Profile',
          description: 'Manage your account settings and preferences',
          icon: <User className="size-5 shrink-0" />,
          url: '#',
        },
      ],
    },
  ],
  mobileExtraLinks = [
    { name: 'Help Center', url: '#' },
    { name: 'Contact Us', url: '#' },
    { name: 'Shipping Info', url: '#' },
    { name: 'Returns', url: '#' },
  ],
  auth = {
    login: { text: 'Log in', url: '#' },
    signup: { text: 'Sign up', url: '#' },
  },
}: NavbarProps) => {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const [mounted, setMounted] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [mobileCartOpen, setMobileCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    setCartOpen(false);
    setMobileCartOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Hide navbar on dashboard pages (dashboard has its own sidebar navigation)
  if (pathname.startsWith('/dashboard')) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 shadow-md bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <nav className="hidden h-16 items-center justify-between lg:flex">
          <div className="flex items-center gap-8">
            <Link href={logo.url} className="flex items-center gap-2.5">
              <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-md ring-1 ring-foreground/10">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={32}
                  height={32}
                  className="object-cover"
                />
              </div>
              <span className="text-lg font-semibold tracking-tight">
                {logo.title}
              </span>
            </Link>
            <div className="flex items-center">
              <NavigationMenu>
                <NavigationMenuList>
                  {menu.map((item) => renderMenuItem(item))}
                </NavigationMenuList>
              </NavigationMenu>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Desktop cart dropdown */}
            <DropdownMenu open={cartOpen} onOpenChange={setCartOpen}>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative cursor-pointer"
                >
                  <ShoppingCart className="size-4" />
                  {mounted && totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <CartPanel />
              </DropdownMenuContent>
            </DropdownMenu>
            <Button asChild variant="outline" size="sm">
              <Link href={auth.login.url}>{auth.login.text}</Link>
            </Button>
            <Button asChild size="sm">
              <Link href={auth.signup.url}>{auth.signup.text}</Link>
            </Button>
          </div>
        </nav>

        {/* Mobile Navigation */}
        <div className="flex h-14 items-center justify-between lg:hidden">
          <Link href={logo.url} className="flex items-center gap-2">
            <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md ring-1 ring-foreground/10">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={28}
                height={28}
                className="object-cover"
              />
            </div>
            <span className="text-base font-semibold tracking-tight">
              {logo.title}
            </span>
          </Link>
          <div className="flex items-center gap-2">
            {/* Mobile cart dropdown */}
            <DropdownMenu
              open={mobileCartOpen}
              onOpenChange={setMobileCartOpen}
            >
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="relative cursor-pointer"
                >
                  <ShoppingCart className="size-4" />
                  {mounted && totalItems > 0 && (
                    <span className="absolute -right-1 -top-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                      {totalItems > 99 ? '99+' : totalItems}
                    </span>
                  )}
                  <span className="sr-only">Cart</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80 p-0">
                <CartPanel />
              </DropdownMenuContent>
            </DropdownMenu>
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="outline"
                  size="icon"
                  className="cursor-pointer"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                <SheetHeader>
                  <SheetTitle>
                    <Link href={logo.url} className="flex items-center gap-2">
                      <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md ring-1 ring-foreground/10">
                        <Image
                          src={logo.src}
                          alt={logo.alt}
                          width={28}
                          height={28}
                          className="object-cover"
                        />
                      </div>
                      <span className="text-base font-semibold">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="my-6 flex flex-col gap-6 px-4">
                  <Accordion
                    type="single"
                    collapsible
                    className="flex w-full flex-col gap-4"
                  >
                    {menu.map((item) => renderMobileMenuItem(item))}
                  </Accordion>
                  <div className="border-t py-4">
                    <div className="grid grid-cols-2 justify-start">
                      {mobileExtraLinks.map((link, idx) => (
                        <Link
                          key={idx}
                          className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-md px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
                          href={link.url}
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button asChild variant="outline">
                      <Link href={auth.login.url}>{auth.login.text}</Link>
                    </Button>
                    <Button asChild>
                      <Link href={auth.signup.url}>{auth.signup.text}</Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

const renderMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <NavigationMenuItem key={item.title} className="text-muted-foreground">
        <NavigationMenuTrigger>{item.title}</NavigationMenuTrigger>
        <NavigationMenuContent>
          <ul className="w-80 p-3">
            {item.items.map((subItem) => (
              <li key={subItem.title}>
                <NavigationMenuLink asChild>
                  <Link
                    className="flex select-none gap-4 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
                    href={subItem.url}
                  >
                    {subItem.icon}
                    <div>
                      <div className="text-sm font-semibold">
                        {subItem.title}
                      </div>
                      {subItem.description && (
                        <p className="text-sm leading-snug text-muted-foreground">
                          {subItem.description}
                        </p>
                      )}
                    </div>
                  </Link>
                </NavigationMenuLink>
              </li>
            ))}
          </ul>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <Link
      key={item.title}
      className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-accent-foreground"
      href={item.url}
    >
      {item.title}
    </Link>
  );
};

const renderMobileMenuItem = (item: MenuItem) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b-0">
        <AccordionTrigger className="py-0 font-semibold hover:no-underline">
          {item.title}
        </AccordionTrigger>
        <AccordionContent className="mt-2">
          {item.items.map((subItem) => (
            <Link
              key={subItem.title}
              className="flex select-none gap-4 rounded-md p-3 leading-none outline-none transition-colors hover:bg-muted hover:text-accent-foreground"
              href={subItem.url}
            >
              {subItem.icon}
              <div>
                <div className="text-sm font-semibold">{subItem.title}</div>
                {subItem.description && (
                  <p className="text-sm leading-snug text-muted-foreground">
                    {subItem.description}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link key={item.title} href={item.url} className="font-semibold">
      {item.title}
    </Link>
  );
};

export { Navbar };
