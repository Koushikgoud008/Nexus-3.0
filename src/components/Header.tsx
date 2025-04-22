
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Menu, ShoppingBag, User, ChevronDown } from "lucide-react";

interface HeaderProps {
  activeCategory?: string;
}

const Header = ({ activeCategory }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  // Categories for dropdown
  const categories = [
    {
      id: "clothing",
      name: "Clothing",
      description: "Discover the latest trends in fashion",
      link: "/category/clothing",
    },
    {
      id: "top-deals",
      name: "Top Deals",
      description: "Best prices across all products",
      link: "/category/top-deals",
    },
    {
      id: "skincare",
      name: "Skincare",
      description: "Premium beauty products",
      link: "/category/skincare",
    },
    {
      id: "smart-watches",
      name: "Smart Watches",
      description: "Latest tech wearables",
      link: "/category/smart-watches",
    },
  ];

  const isActiveLink = (path: string) => {
    return location.pathname === path;
  };

  const isActiveCategory = (id: string) => {
    return activeCategory === id;
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <ShoppingBag className="h-6 w-6 text-peach-600" />
            <div className="flex items-baseline">
              <span className="text-xl font-bold text-gray-900">Nexus</span>
              <span className="text-xl font-cursive ml-1 text-peach-600">Store</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1 items-center">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <Link to="/" className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink("/") && "bg-accent text-accent-foreground"
                  )}>
                    Home
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className={activeCategory ? "bg-accent text-accent-foreground" : ""}>
                    Products
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {categories.map((category) => (
                        <li key={category.id} className="row-span-1">
                          <NavigationMenuLink asChild>
                            <Link
                              to={category.link}
                              className={cn(
                                "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                                isActiveCategory(category.id) && "bg-accent text-accent-foreground"
                              )}
                            >
                              <div className="text-sm font-medium leading-none">{category.name}</div>
                              <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {category.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/about" className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink("/about") && "bg-accent text-accent-foreground"
                  )}>
                    About
                  </Link>
                </NavigationMenuItem>
                
                <NavigationMenuItem>
                  <Link to="/contact" className={cn(
                    navigationMenuTriggerStyle(),
                    isActiveLink("/contact") && "bg-accent text-accent-foreground"
                  )}>
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center space-x-2 ml-4">
                    <User size={16} />
                    <span className="hidden sm:inline">Account</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <div className="px-2 py-1.5 text-sm">
                    Signed in as <span className="font-semibold">{user.email}</span>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="w-full cursor-pointer">
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/settings" className="w-full cursor-pointer">
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => logout()}
                    className="text-red-600 cursor-pointer"
                  >
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button asChild variant="default" className="ml-4 bg-peach-600 hover:bg-peach-700">
                <Link to="/auth">Sign In</Link>
              </Button>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t mt-4">
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className={`block px-2 py-1 rounded ${isActiveLink("/") ? "bg-beige-100 text-peach-600" : "text-gray-700 hover:text-peach-600"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              
              <li>
                <div className="px-2 py-1 flex items-center justify-between text-gray-700">
                  Products
                  <ChevronDown className="h-4 w-4" />
                </div>
                <ul className="ml-4 mt-1 space-y-1">
                  {categories.map((category) => (
                    <li key={category.id}>
                      <Link
                        to={category.link}
                        className={`block px-2 py-1 rounded ${isActiveCategory(category.id) ? "bg-beige-100 text-peach-600" : "text-gray-700 hover:text-peach-600"}`}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
              
              <li>
                <Link
                  to="/about"
                  className={`block px-2 py-1 rounded ${isActiveLink("/about") ? "bg-beige-100 text-peach-600" : "text-gray-700 hover:text-peach-600"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={`block px-2 py-1 rounded ${isActiveLink("/contact") ? "bg-beige-100 text-peach-600" : "text-gray-700 hover:text-peach-600"}`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link
                      to="/profile"
                      className="block px-2 py-1 text-gray-700 hover:text-peach-600"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Button
                      variant="ghost"
                      className="w-full justify-start px-2 text-red-600 hover:text-red-700"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign Out
                    </Button>
                  </li>
                </>
              ) : (
                <li className="pt-2">
                  <Button
                    asChild
                    className="w-full bg-peach-600 hover:bg-peach-700"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Link to="/auth">Sign In</Link>
                  </Button>
                </li>
              )}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
