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

import { getLocalizedPath } from '@/lib/helper';
import { Button } from '@/components/ui/button';
import { useI18n } from '@/core/i18n/I18nProvider';
import { CartPanel } from '@/features/cart/components/CartPanel';
import { LanguageSwitcher } from '@/components/language-switcher';
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
  logo: logoProp,
  menu: menuProp,
  mobileExtraLinks: mobileExtraLinksProp,
  auth: authProp,
}: NavbarProps) => {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const { locale, lang, dir } = useI18n();
  const [mounted, setMounted] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [mobileCartOpen, setMobileCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  const [animateBadge, setAnimateBadge] = React.useState(false);
  const prevItemsCount = React.useRef(totalItems);

  // Helper to prepend locale to paths
  const localizePath = React.useCallback(
    (url: string) => {
      return getLocalizedPath(url, locale);
    },
    [locale]
  );

  // Generate localized objects
  const logo = logoProp || {
    url: localizePath('/'),
    src: '/logo.svg',
    alt: `${lang.common.title} logo`,
    title: lang.common.title,
  };

  const menu: MenuItem[] = menuProp || [
    { title: lang.common.home, url: localizePath('/') },
    {
      title: lang.common.shop,
      url: localizePath('/'),
      items: [
        {
          title: lang.navbar.allProducts,
          description: lang.navbar.allProducts,
          icon: <Package className="size-5 shrink-0" />,
          url: localizePath('/'),
        },
        {
          title: lang.navbar.newArrivals,
          description: lang.navbar.newArrivals,
          icon: <Zap className="size-5 shrink-0" />,
          url: localizePath('/'),
        },
        {
          title: lang.navbar.bestSellers,
          description: lang.navbar.bestSellers,
          icon: <Star className="size-5 shrink-0" />,
          url: localizePath('/'),
        },
        {
          title: lang.navbar.dealsOffers,
          description: lang.navbar.dealsOffers,
          icon: <Tag className="size-5 shrink-0" />,
          url: localizePath('/'),
        },
      ],
    },
    {
      title: lang.navbar.profile || 'Account',
      url: '#',
      items: [
        {
          title: lang.navbar.myOrders,
          description: lang.navbar.myOrders,
          icon: <Truck className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: lang.navbar.wishlist,
          description: lang.navbar.wishlist,
          icon: <Heart className="size-5 shrink-0" />,
          url: '#',
        },
        {
          title: lang.common.dashboard,
          description: lang.common.dashboard,
          icon: <LayoutDashboard className="size-5 shrink-0" />,
          url: localizePath('/dashboard'),
        },
        {
          title: lang.navbar.profile,
          description: lang.navbar.profile,
          icon: <User className="size-5 shrink-0" />,
          url: '#',
        },
      ],
    },
  ];

  const mobileExtraLinks = mobileExtraLinksProp || [
    { name: lang.navbar.helpCenter, url: '#' },
    { name: lang.navbar.contactUs, url: '#' },
    { name: lang.navbar.shippingInfo, url: '#' },
    { name: lang.navbar.returns, url: '#' },
  ];

  const auth = authProp || {
    login: { text: lang.navbar.login, url: '#' },
    signup: { text: lang.navbar.signup, url: '#' },
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && totalItems > prevItemsCount.current) {
      setAnimateBadge(true);
      const timer = setTimeout(() => setAnimateBadge(false), 400);
      return () => clearTimeout(timer);
    }
    prevItemsCount.current = totalItems;
  }, [totalItems, mounted]);

  React.useEffect(() => {
    setCartOpen(false);
    setMobileCartOpen(false);
    setMenuOpen(false);
  }, [pathname]);

  // Strip locale prefix from pathname to test for dashboard pages
  const normalizedPathname = pathname.replace(/^\/[a-z]{2}/, '');
  if (normalizedPathname.startsWith('/dashboard')) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-300 shadow-md bg-background">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        {/* Desktop Navigation */}
        <nav className="hidden h-16 items-center justify-between lg:flex">
          {/* Logo + Nav links grouped together */}
          <div className="flex items-center gap-6">
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
                {appConfig.name}
              </span>
            </Link>
            <NavigationMenu>
              <NavigationMenuList>
                {(dir === 'rtl' ? [...menu].reverse() : menu).map((item) =>
                  renderMenuItem(item)
                )}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          {/* Actions */}
          <div className="flex items-center gap-3">
            <LanguageSwitcher />
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
                    <span className="absolute -right-1 -top-1 flex items-center justify-center">
                      {animateBadge && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                      )}
                      <span className="relative flex min-w-4 h-4 items-center justify-center rounded-full bg-red-600 px-1 text-[11px] font-bold leading-none text-white">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
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
            <LanguageSwitcher />
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
                    <span className="absolute -right-1 -top-1 flex items-center justify-center">
                      {animateBadge && (
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75"></span>
                      )}
                      <span className="relative flex min-w-4 h-4 items-center justify-center rounded-full bg-red-600 px-1 text-[9px] font-bold leading-none text-white">
                        {totalItems > 99 ? '99+' : totalItems}
                      </span>
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
