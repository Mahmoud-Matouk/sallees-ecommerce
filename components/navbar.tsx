'use client';

import Link from 'next/link';
import * as React from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  User,
  LogIn,
  LogOut,
  Loader2,
  ArrowRight,
  ArrowLeft,
  Package,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/core/i18n/I18nProvider';
import { Skeleton } from '@/components/ui/skeleton';
import { CartPanel } from '@/features/cart/components/CartPanel';
import { getLocalizedPath, localizeCurrency } from '@/lib/helper';
import { LanguageSwitcher } from '@/components/language-switcher';
import { useAuthStore } from '@/features/auth/hooks/useAuthStore';
import { useCartStore } from '@/features/cart/hooks/useCartStore';
import type { ProductSummary } from '@/features/products/types/product.types';
import { useWishlistStore } from '@/features/wishlist/hooks/useWishlistStore';
import { productService } from '@/features/products/services/product.service';
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
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { locale, translation: t, dir } = useI18n();

  const totalCartItems = useCartStore((s) => s.totalItems());
  const totalWishlistItems = useWishlistStore((s) => s.totalItems());
  const { isAuthenticated, user, logout } = useAuthStore();

  const [mounted, setMounted] = React.useState(false);
  const [cartOpen, setCartOpen] = React.useState(false);
  const [mobileCartOpen, setMobileCartOpen] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [suggestions, setSuggestions] = React.useState<ProductSummary[]>([]);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = React.useState(false);
  const [showSuggestions, setShowSuggestions] = React.useState(false);
  const [animateCartBadge, setAnimateCartBadge] = React.useState(false);

  const productsCatalogRef = React.useRef<ProductSummary[] | null>(null);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);
  const mobileSearchContainerRef = React.useRef<HTMLDivElement>(null);
  const prevCartCount = React.useRef(totalCartItems);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    if (mounted && totalCartItems > prevCartCount.current) {
      setAnimateCartBadge(true);
      const timer = setTimeout(() => setAnimateCartBadge(false), 400);
      return () => clearTimeout(timer);
    }
    prevCartCount.current = totalCartItems;
  }, [totalCartItems, mounted]);

  React.useEffect(() => {
    setCartOpen(false);
    setMobileCartOpen(false);
    setMenuOpen(false);
    setShowSuggestions(false);
  }, [pathname]);

  // Handle outside click to dismiss suggestions
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const isInsideDesktop = searchContainerRef.current?.contains(target);
      const isInsideMobile = mobileSearchContainerRef.current?.contains(target);
      if (!isInsideDesktop && !isInsideMobile) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch product catalog for fast, accurate live suggestions
  const fetchCatalog = React.useCallback(async () => {
    if (productsCatalogRef.current && productsCatalogRef.current.length > 0) {
      return productsCatalogRef.current;
    }
    try {
      const res = await productService.getAll({ limit: '60' });
      if (res && res.data) {
        productsCatalogRef.current = res.data;
        return res.data;
      }
    } catch (error) {
      console.error('Error fetching catalog for autocomplete:', error);
    }
    return [];
  }, []);

  // Preload catalog on initial mount
  React.useEffect(() => {
    fetchCatalog();
  }, [fetchCatalog]);

  // Filter suggestions live on every keystroke
  React.useEffect(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      setSuggestions([]);
      setIsLoadingSuggestions(false);
      return;
    }

    setIsLoadingSuggestions(true);
    fetchCatalog().then((catalog) => {
      const matches = catalog.filter((p) => {
        const titleMatch = p.title?.toLowerCase().includes(query);
        const descMatch = p.description?.toLowerCase().includes(query);
        const brandMatch = p.brand?.name?.toLowerCase().includes(query);
        const catMatch = p.category?.name?.toLowerCase().includes(query);
        return titleMatch || descMatch || brandMatch || catMatch;
      });

      setSuggestions(matches.slice(0, 6));
      setIsLoadingSuggestions(false);
    });
  }, [searchQuery, fetchCatalog]);

  const localize = React.useCallback(
    (url: string) => getLocalizedPath(url, locale),
    [locale]
  );

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!searchQuery.trim()) return;
    setShowSuggestions(false);
    const targetUrl = localize(
      `/?search=${encodeURIComponent(searchQuery.trim())}#products`
    );
    router.push(targetUrl);
  };

  const handleSelectSuggestion = (productId: string) => {
    setShowSuggestions(false);
    router.push(localize(`/${productId}`));
  };

  // Skip rendering navbar on dashboard internal pages
  const normalizedPathname = pathname.replace(/^\/[a-z]{2}/, '');
  if (normalizedPathname.startsWith('/dashboard')) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/80 bg-background/95 backdrop-blur-md transition-shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Desktop View */}
        <div className="hidden h-20 items-center justify-between gap-8 lg:flex">
          {/* Brand Logo */}
          <Link
            href={localize('/')}
            className="flex items-center gap-3 transition-transform duration-200 hover:opacity-90 shrink-0"
          >
            <div className="flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-foreground/10">
              <Image
                src="/logo.svg"
                alt={`${t.common.title} logo`}
                width={36}
                height={36}
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-foreground">
                {t.common.title}
              </span>
            </div>
          </Link>

          {/* Expanded Center Search Bar with Live Suggestions */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-2xl">
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-xl border border-input bg-card shadow-xs transition-all focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/20 overflow-hidden"
            >
              {/* Input field */}
              <input
                type="text"
                value={searchQuery}
                onFocus={() => {
                  fetchCatalog();
                  if (searchQuery.trim().length > 0) setShowSuggestions(true);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setShowSuggestions(false);
                }}
                placeholder={t.common.searchPlaceholder}
                className="flex-1 bg-transparent px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border-none min-w-0"
              />

              {/* Loading spinner or submit icon */}
              <button
                type="submit"
                className="flex h-11 w-12 shrink-0 items-center justify-center bg-primary text-primary-foreground transition-all hover:bg-primary/90 cursor-pointer"
                title={t.common.search}
              >
                {isLoadingSuggestions ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
              </button>
            </form>

            {/* Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute top-full mt-1.5 inset-x-0 z-50 rounded-xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                {isLoadingSuggestions ? (
                  <div className="p-3 space-y-2.5">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="size-10 rounded-lg shrink-0" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-3.5 w-3/4" />
                          <Skeleton className="h-3 w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : suggestions.length > 0 ? (
                  <div>
                    <div className="px-3 py-2 text-[11px] font-bold uppercase tracking-wider text-muted-foreground border-b border-border/60 bg-muted/30">
                      {t.navbar.suggestedProducts}
                    </div>
                    <ul className="max-h-72 overflow-y-auto divide-y divide-border/40">
                      {suggestions.map((product) => (
                        <li key={product._id}>
                          <button
                            type="button"
                            onClick={() => handleSelectSuggestion(product._id)}
                            className="w-full flex items-center gap-3 p-2.5 hover:bg-muted/80 transition-colors text-start cursor-pointer"
                          >
                            <div className="relative size-10 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/60">
                              {product.imageCover ? (
                                <Image
                                  src={product.imageCover}
                                  alt={product.title}
                                  fill
                                  sizes="40px"
                                  className="object-contain p-1"
                                />
                              ) : (
                                <Package className="size-5 m-auto text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground line-clamp-1">
                                {product.title}
                              </p>
                              <span className="text-[10px] text-muted-foreground block">
                                {product.brand?.name || product.category?.name}
                              </span>
                            </div>
                            <span className="text-xs font-extrabold text-primary shrink-0">
                              {localizeCurrency(product.price, locale)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    {/* View all footer */}
                    <button
                      type="button"
                      onClick={() => handleSearch()}
                      className="w-full p-2.5 text-center text-xs font-bold text-primary bg-muted/40 hover:bg-muted transition-colors border-t border-border/60 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>
                        {t.navbar.viewAllResults} &ldquo;{searchQuery}&rdquo;
                      </span>
                      {dir === 'rtl' ? (
                        <ArrowLeft className="size-3.5" />
                      ) : (
                        <ArrowRight className="size-3.5" />
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="p-6 text-center text-xs text-muted-foreground">
                    {t.navbar.noSuggestions}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Action Icons (Account/Login, Wishlist, Cart, Lang) */}
          <div className="flex items-center gap-3 shrink-0">
            <LanguageSwitcher />

            {/* Wishlist */}
            <Link
              href={localize('/#wishlist')}
              className="relative flex flex-col items-center justify-center px-2 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
            >
              <div className="relative">
                <Heart className="size-5" />
                {mounted && totalWishlistItems > 0 && (
                  <span className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalWishlistItems}
                  </span>
                )}
              </div>
              <span className="text-[11px] font-semibold mt-0.5">
                {t.common.wishlist}
              </span>
            </Link>

            {/* Cart Dropdown */}
            <DropdownMenu open={cartOpen} onOpenChange={setCartOpen}>
              <DropdownMenuTrigger asChild>
                <button className="relative flex flex-col items-center justify-center px-2 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                  <div className="relative">
                    <ShoppingCart className="size-5" />
                    {mounted && totalCartItems > 0 && (
                      <span className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center">
                        {animateCartBadge && (
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                        )}
                        <span className="relative flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {totalCartItems > 99 ? '99+' : totalCartItems}
                        </span>
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-semibold mt-0.5">
                    {t.common.cart}
                  </span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 p-0 shadow-xl border-border"
              >
                <CartPanel />
              </DropdownMenuContent>
            </DropdownMenu>

            {/* User Account / Login Button */}
            {mounted && isAuthenticated ? (
              /* Logged In -> Show Account Dropdown */
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="flex flex-col items-center justify-center px-2 py-1 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer">
                    <User className="size-5" />
                    <span className="text-[11px] font-semibold mt-0.5 line-clamp-1 max-w-[70px]">
                      {user?.name ? user.name.split(' ')[0] : t.common.account}
                    </span>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <div className="px-3 py-2 border-b border-border bg-muted/30">
                    <p className="text-xs font-bold text-foreground line-clamp-1">
                      {user?.name || t.common.account}
                    </p>
                    {user?.email && (
                      <p className="text-[10px] text-muted-foreground line-clamp-1">
                        {user.email}
                      </p>
                    )}
                  </div>
                  <DropdownMenuItem asChild>
                    <Link href={localize('/dashboard')}>
                      {t.common.dashboard}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href={localize('/#orders')}>{t.navbar.myOrders}</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={logout}
                    className="text-destructive focus:text-destructive cursor-pointer flex items-center gap-2"
                  >
                    <LogOut className="size-4" />
                    <span>{t.navbar.logout}</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              /* Not Logged In -> Prominent Eye-Catching Login CTA Button */
              <Link
                href={localize('/#login')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground font-bold text-xs shadow-xs hover:bg-primary/90 hover:shadow-md transition-all cursor-pointer select-none shrink-0"
                title={t.navbar.login}
              >
                <LogIn className="size-4 shrink-0" />
                <span>{t.navbar.login}</span>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation Header */}
        <div className="flex flex-col gap-3 py-3 lg:hidden">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href={localize('/')} className="flex items-center gap-2">
              <div className="flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-lg ring-1 ring-foreground/10">
                <Image
                  src="/logo.svg"
                  alt={`${t.common.title} logo`}
                  width={28}
                  height={28}
                  className="object-cover"
                />
              </div>
              <span className="text-base font-bold text-foreground">
                {t.common.title}
              </span>
            </Link>

            {/* Actions */}
            <div className="flex items-center gap-1.5">
              <LanguageSwitcher />

              {/* Mobile Wishlist */}
              <Link
                href={localize('/#wishlist')}
                className="relative flex items-center justify-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors cursor-pointer"
                title={t.common.wishlist}
              >
                <Heart className="size-5" />
                {mounted && totalWishlistItems > 0 && (
                  <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                    {totalWishlistItems}
                  </span>
                )}
              </Link>

              {/* Mobile Cart */}
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
                    <ShoppingCart className="size-5" />
                    {mounted && totalCartItems > 0 && (
                      <span className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                        {totalCartItems > 99 ? '99+' : totalCartItems}
                      </span>
                    )}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80 p-0">
                  <CartPanel />
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile Menu Drawer */}
              <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="cursor-pointer"
                  >
                    <Menu className="size-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side={dir === 'rtl' ? 'right' : 'left'}
                  className="overflow-y-auto w-80"
                >
                  <SheetHeader>
                    <SheetTitle className="flex items-center gap-2">
                      <div className="flex size-7 shrink-0 items-center justify-center overflow-hidden rounded-md ring-1 ring-foreground/10">
                        <Image
                          src="/logo.svg"
                          alt={`${t.common.title} logo`}
                          width={24}
                          height={24}
                          className="object-cover"
                        />
                      </div>
                      <span>{t.common.title}</span>
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 flex flex-col gap-2">
                    <Link
                      href={localize('/#wishlist')}
                      onClick={() => setMenuOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted flex items-center justify-between"
                    >
                      <span>{t.common.wishlist}</span>
                      {mounted && totalWishlistItems > 0 && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                          {totalWishlistItems}
                        </span>
                      )}
                    </Link>
                    {mounted && isAuthenticated ? (
                      <>
                        <div className="px-3 py-2 rounded-lg bg-muted/50 mb-1">
                          <p className="text-xs font-bold text-foreground">
                            {user?.name || t.common.account}
                          </p>
                          {user?.email && (
                            <p className="text-[10px] text-muted-foreground">
                              {user.email}
                            </p>
                          )}
                        </div>
                        <Link
                          href={localize('/dashboard')}
                          onClick={() => setMenuOpen(false)}
                          className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                          {t.common.dashboard}
                        </Link>
                        <Link
                          href={localize('/#orders')}
                          onClick={() => setMenuOpen(false)}
                          className="px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted"
                        >
                          {t.navbar.myOrders}
                        </Link>
                        <button
                          type="button"
                          onClick={() => {
                            logout();
                            setMenuOpen(false);
                          }}
                          className="px-3 py-2 text-start rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors flex items-center gap-2 cursor-pointer"
                        >
                          <LogOut className="size-4" />
                          <span>{t.navbar.logout}</span>
                        </button>
                      </>
                    ) : (
                      <div className="flex flex-col gap-2 pt-2">
                        <Button asChild size="sm" className="w-full">
                          <Link
                            href={localize('/#login')}
                            onClick={() => setMenuOpen(false)}
                          >
                            {t.navbar.login}
                          </Link>
                        </Button>
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="w-full"
                        >
                          <Link
                            href={localize('/#signup')}
                            onClick={() => setMenuOpen(false)}
                          >
                            {t.navbar.signup}
                          </Link>
                        </Button>
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar with Live Suggestions */}
          <div ref={mobileSearchContainerRef} className="relative w-full">
            <form
              onSubmit={handleSearch}
              className="flex items-center rounded-xl border border-input bg-card shadow-xs overflow-hidden"
            >
              <input
                type="text"
                value={searchQuery}
                onFocus={() => {
                  fetchCatalog();
                  if (searchQuery.trim().length > 0) setShowSuggestions(true);
                }}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') setShowSuggestions(false);
                }}
                placeholder={t.common.searchPlaceholder}
                className="flex-1 bg-transparent px-3 py-2 text-sm placeholder:text-muted-foreground outline-none"
              />
              <button
                type="submit"
                className="flex h-9 w-10 shrink-0 items-center justify-center bg-primary text-primary-foreground"
              >
                {isLoadingSuggestions ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <Search className="size-4" />
                )}
              </button>
            </form>

            {/* Mobile Suggestions Dropdown */}
            {showSuggestions && searchQuery.trim().length > 0 && (
              <div className="absolute top-full mt-1.5 inset-x-0 z-50 rounded-xl border border-border bg-card text-card-foreground shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95 duration-150">
                {isLoadingSuggestions ? (
                  <div className="p-3 space-y-2.5">
                    {[1, 2].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <Skeleton className="size-9 rounded-lg shrink-0" />
                        <div className="space-y-1 flex-1">
                          <Skeleton className="h-3 w-3/4" />
                          <Skeleton className="h-2.5 w-1/3" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : suggestions.length > 0 ? (
                  <div>
                    <ul className="max-h-60 overflow-y-auto divide-y divide-border/40">
                      {suggestions.map((product) => (
                        <li key={product._id}>
                          <button
                            type="button"
                            onClick={() => handleSelectSuggestion(product._id)}
                            className="w-full flex items-center gap-2.5 p-2 hover:bg-muted/80 transition-colors text-start cursor-pointer"
                          >
                            <div className="relative size-9 rounded-lg overflow-hidden bg-muted shrink-0 border border-border/60">
                              {product.imageCover ? (
                                <Image
                                  src={product.imageCover}
                                  alt={product.title}
                                  fill
                                  sizes="36px"
                                  className="object-contain p-1"
                                />
                              ) : (
                                <Package className="size-4 m-auto text-muted-foreground" />
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground line-clamp-1">
                                {product.title}
                              </p>
                            </div>
                            <span className="text-xs font-bold text-primary shrink-0">
                              {localizeCurrency(product.price, locale)}
                            </span>
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      type="button"
                      onClick={() => handleSearch()}
                      className="w-full p-2 text-center text-xs font-bold text-primary bg-muted/40 hover:bg-muted transition-colors border-t border-border/60 flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>
                        {t.navbar.viewAllResults} &ldquo;{searchQuery}&rdquo;
                      </span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 text-center text-xs text-muted-foreground">
                    {t.navbar.noSuggestions}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
