import { useState, useEffect } from 'react';
import { NavLink, Outlet, Link, useLocation } from 'react-router-dom';
import loginPageImage from '../assets/images/login_page_image.png';
function UserLoginRegister() {
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
      <section className="container mx-auto flex min-h-screen flex-row flex-wrap items-center justify-around space-x-3.5">
        {/* LEFT SECTION */}

        <section className="flex w-1/2 flex-1 flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <h2 className="mb-1 flex h-2/5 items-center font-theme_logo text-3xl text-primary">
              {import.meta.env.VITE_SITE_NAME}
            </h2>
            <p className="tracking-[.6rem] text-accent">24/7 at Your Service!</p>
          </div>
          <img src={loginPageImage} className="hidden w-2/3 sm:block" loading="lazy" />
        </section>

        {/* RIGHT SECTION */}
        <section className="mx-4 flex w-1/2 flex-1 flex-col items-stretch space-y-5 p-4">
          {/* <div className="flex-grow flex flex-col mx-4 size-1/2 rounded bg-accent_magenta p-6 px-6 py-8 shadow-lg"> */}
          <div className="flex flex-col space-y-3">
            <h2 className="mb-1 text-4xl font-bold">
              {path.current == path.signIn ? 'Log in to your account' : 'Sign up with your account'}
            </h2>
            <p className="mb-1 text-sm text-neutral-500">
              {path.current == path.signIn ? 'Welcome back! Select method to sign up.' : 'Select method to sign up'}
            </p>
          </div>

          {/* AUTH VIA GOOGLE / FACEBOOK */}

          <div className="flex min-h-12 cursor-pointer items-stretch space-x-4">
            <div className="flex flex-1 items-center justify-center border transition-all hover:bg-slate-100">
              GOOGLE
            </div>
            <div className="flex flex-1 items-center justify-center border transition-all hover:bg-slate-100">
              FACEBOOK
            </div>
          </div>
          <div className="text-center text-neutral-500">or continue with email</div>

          {/* AUTH VIA FORM */}

          <div className="form">
            <Outlet />
          </div>
          <div className="pt-2 text-right">
            {path.current == path.signIn ? (
              <p>
                Dont hanve an account?
                <NavLink className="mx-1 text-base font-bold text-accent" to="register">
                  Create one
                </NavLink>
              </p>
            ) : (
              <p>
                Already a member?
                <NavLink className="mx-1 text-base font-bold text-accent" to="/sign-in">
                  Sign In
                </NavLink>
              </p>
            )}
          </div>
          {/* </div> */}
        </section>
      </section>
    </>
  );
}

export default UserLoginRegister;
