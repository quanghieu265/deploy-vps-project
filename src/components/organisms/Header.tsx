'use client';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useDispatch } from 'react-redux';
import { setAuthenticate } from '@/store/reducer/AuthReducer';
import { useMutation } from '@tanstack/react-query';
import services from '@/services';

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = useMutation({
    mutationFn: () => {
      return services.auth.handleLogout();
    },
    onSuccess: () => {
      dispatch(setAuthenticate({ isAuthenticated: false }));
      navigate('/auth/login');
    },
  });

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link to="/">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
          </Link>

          <Link to="/users">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Users</NavigationMenuLink>
          </Link>

          <Link to="/auth/login">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>Login</NavigationMenuLink>
          </Link>

          <Link to="/auth/register">
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>
              Register
            </NavigationMenuLink>
          </Link>

          <Button
            onClick={() => {
              handleLogout.mutate();
            }}
            variant={'outline'}
          >
            Logout
          </Button>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Header;
