import React from 'react'
import ufo from '../../static/images/illustrations/ufo.svg'
import ufo_dark from '../../static/images/illustrations/ufo-dark.svg'
// import { Darkmode } from '../elements/DarkModeBtn'
import { Link } from 'react-router-dom'

export const Error404 = () => {
  return (
    <main className="min-h-screen grid w-full grow grid-cols-1 place-items-center bg-center">
        <div className="max-w-[26rem] text-center">
          <div className="w-full">
            {/* {Darkmode ? (
            <img
              className="w-full"
              src={ufo_dark}
              alt="image"
            />):( */}
            <img
              className="w-full"
              src={ufo}
              alt="image"
            />
            {/* )
        } */}
          </div>
          <p className="pt-4 text-7xl font-bold text-primary dark:text-accent">
            404
          </p>
          <p
            className="pt-4 text-xl font-semibold text-slate-800 dark:text-navy-50"
          >
            Oops. This Page Not Found.
          </p>
          <p className="pt-2 text-slate-500 dark:text-navy-200">
            This page you are looking not available
          </p>

          <Link
            to="/"
            className="btn mt-8 h-11 rounded-lg bg-blue-700 text-base font-medium text-white hover:bg-primary-focus hover:shadow-lg hover:shadow-primary/50 focus:bg-primary-focus focus:shadow-lg focus:shadow-primary/50 active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:hover:shadow-accent/50 dark:focus:bg-accent-focus dark:focus:shadow-accent/50 dark:active:bg-accent/90"
          >
            Back To Home
          </Link>
        </div>
      </main>
  )
}
