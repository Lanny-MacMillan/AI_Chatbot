import * as React from 'react';
import { Button } from './button';

const login = () => {
  const style = {};
  return (
    <a
      className="text-white bg-custom-purple-300 border-4 border-custom-magenta-200 hover:bg-custom-purple-400 hover:border-custom-magenta-300 focus:ring-4 focus:ring-custom-purple-100 font-customBlack rounded-lg text-sm px-7 py-3.5 me-2 mb-2 dark:bg-custom-purple-100 dark:hover:bg-custom-purple-200"
      href="/api/auth/login"
    >
      Log In
    </a>
  );
};

export default login;
