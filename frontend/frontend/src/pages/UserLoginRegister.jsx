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
      <section className="mx-auto flex min-h-screen w-[1280px] flex-row items-center justify-around space-x-3.5">
        {/* LEFT SECTION */}

        <section className="flex flex-1 flex-col items-center space-y-8 lg:h-[60vh]">
          <div className="flex flex-col items-center">
            <h2 className="mb-1 flex h-2/5 items-center font-theme_logo text-4xl text-primary">Creative Bot</h2>
            <p className="tracking-[.5rem]">24/7 at Your Service!</p>
          </div>
          <img src={loginPageImage} className="w-2/3" loading="lazy" />
        </section>

        {/* RIGHT SECTION */}
        <section className="mx-4 flex flex-1 flex-col items-stretch space-y-5">
          {/* <div className="flex-grow flex flex-col mx-4 size-1/2 rounded bg-accent_magenta p-6 px-6 py-8 shadow-lg"> */}
          <div className="flex flex-col">
            <h2 className="mb-1 text-4xl font-bold">
              {path.current == path.signIn ? 'Log in to your account' : 'Sing up with your account'}
            </h2>
            <p className="mb-1 text-sm">
              {path.current == path.signIn ? 'Welcome back! Select method to sign up.' : 'Sign Up'}
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
          <div className="text-center">or continue with email</div>

          {/* AUTH VIA FORM */}

          <div className="form">
            <Outlet />
          </div>
          <div className="pt-2 text-right">
            {path.current == path.signIn ? (
              <p>
                Dont hanve an account?{' '}
                <NavLink className="text-base font-bold" to="register">
                  Create one
                </NavLink>
              </p>
            ) : (
              <p>
                Already a member?{' '}
                <NavLink className="text-base font-bold" to="/sign-in">
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
