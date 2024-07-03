import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';

function SignInSignUp() {
  const [isUser, setIsUser] = useState(false);

  let location = useLocation();
  location = location.pathname;
  const path = {
    current: '',
    signIn: 'sign-in',
    signUp: 'register',
  };
  path.current = location.slice(location.lastIndexOf('/') + 1);
  return (
    <>
      <div className="flex h-screen flex-col items-center justify-around bg-cwu_dk_charcoal py-10">
        <h2 className="h-2/5 flex items-center mb-1 text-[64px] text-cwu_theme_orng font-bold">
          {import.meta.env.VITE_SITE_NAME}
        </h2>
        <div className="flex-grow flex flex-col mx-4 size-1/2 rounded bg-cwu_theme_orng_magenta p-6 px-6 py-8 shadow-lg">
          <div className="items-center flex-grow">
            <h2 className="mb-1 text-center text-4xl font-bold text-cwu_theme_orng">
              {path.current == path.signIn ? 'Welcome Back' : 'Sign Up'}
            </h2>
          </div>
          <div className="form">
            <Outlet />
          </div>
          <div className="text-white  text-right pt-2">
            {path.current == path.signIn ? (
              <p>
                Dont hanve an account?{' '}
                <NavLink className="text-cwu_theme_orng font-bold" to="register">
                  Create one
                </NavLink>
              </p>
            ) : (
              <p>
                Already a member?{' '}
                <NavLink className="text-cwu_theme_orng font-bold" to="/sign-in">
                  Sign In
                </NavLink>
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SignInSignUp;
