import React, {useEffect, useState} from 'react'
import { Users } from '../components/Users'
import { useContext } from 'react';
import { AdminContext } from '../AdminContext';
import { all } from 'axios';

export const AdminDashboard = () => {
    const [tab, setTab] = useState('monthly');
    const [allUsers, setAllUsers] = useState([]);
    const [premiumUsers, setPremiumUsers] = useState([]);
    const {users, stockwatches} = useContext(AdminContext);
    const [stocks, setStocks] = useState([])


    useEffect(() => {
        setAllUsers(users);
        const premiumUsers = users.filter(user => user.profile.plan_type === 'Premium');
        setPremiumUsers(premiumUsers);
    }, [users]);

    useEffect(() => {
        setStocks(stockwatches);
    }, [stockwatches]);


  return (
    <>
            <div
                className="mt-4 grid grid-cols-12 gap-4 px-[var(--margin-x)] transition-all duration-[.25s] sm:mt-5 sm:gap-5 lg:mt-6 lg:gap-6"
            >
                <div className="col-span-12 lg:col-span-8">
                    <div className="flex items-center justify-between space-x-2">
                        <h2
                            className="text-base font-medium tracking-wide text-slate-800 line-clamp-1 dark:text-navy-100"
                        >
                            Pro Users
                        </h2>
                        <div
                            className="is-scrollbar-hidden overflow-x-auto rounded-lg bg-slate-200 text-slate-600 dark:bg-navy-800 dark:text-navy-200"
                        >
                            <div className="tabs-list flex p-1">
                                <button
                                onClick={() => setTab('monthly')}
                                    className={"btn shrink-0 px-3 py-1 text-xs+ font-medium " + (tab === 'monthly' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
                                >
                                    Last month
                                </button>
                                <button onClick={() => setTab('yearly')}
                                    className={"btn shrink-0 px-3 py-1 text-xs+ font-medium " + (tab === 'yearly' ? 'bg-white shadow dark:bg-navy-500 dark:text-navy-100' : 'hover:text-slate-800 focus:text-slate-800 dark:hover:text-navy-100 dark:focus:text-navy-100')}
                                >
                                    Last year
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-4">
                        <div className="ax-transparent-gridline">
                            {/* <div
                                x-init="$nextTick(() => { $el._x_chart = new ApexCharts($el,pages.charts.analyticsSalesOverview); $el._x_chart.render() });"
                            ></div> */}
                            {/* {lineChart.render()} */}
                        </div>
                    </div>
                </div>

                <div className="col-span-12 lg:col-span-4">
                    <div
                        className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-2"
                    >
                        <div className="rounded-lg bg-slate-150 p-4 dark:bg-navy-700">
                            <div className="flex justify-between space-x-1">
                                <p
                                    className="text-xl font-semibold text-slate-700 dark:text-navy-100"
                                >
                                    8.8k
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-primary dark:text-accent"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <p className="mt-1 text-xs+">Income</p>
                        </div>
                        <div className="rounded-lg bg-slate-150 p-4 dark:bg-navy-700">
                            <div className="flex justify-between">
                                <p
                                    className="text-xl font-semibold text-slate-700 dark:text-navy-100"
                                >
                                    {/* // check the length of the users.profile.plan_type == 'Premium' */}
                                    {premiumUsers.length}
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-success"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    // stroke="currentColor" pink color
                                    stroke='#ff0080'
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                    />
                                </svg>
                            </div>
                            <p className="mt-1 text-xs+">Pro</p>
                        </div>
                        <div className="rounded-lg bg-slate-150 p-4 dark:bg-navy-700">
                            <div className="flex justify-between">
                                <p
                                    className="text-xl font-semibold text-slate-700 dark:text-navy-100"
                                >
                                    {stocks.length}
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-warning"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <p className="mt-1 text-xs+">Stockwatches</p>
                        </div>
                        <div className="rounded-lg bg-slate-150 p-4 dark:bg-navy-700">
                            <div className="flex justify-between">
                                <p
                                    className="text-xl font-semibold text-slate-700 dark:text-navy-100"
                                >
                                    651
                                </p>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5 text-info"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0"
                                    />
                                </svg>
                            </div>
                            <p className="mt-1 text-xs+">Dispatch</p>
                        </div>

                        <div className="rounded-lg col-span-2 bg-slate-150 p-4 dark:bg-navy-700 text-xs">
                            <div className="flex justify-between gap-4">
                                <span>Monthly</span>
                                <button 
                                // onClick={handleSavePaymentPrice}
                                 class="btn py-0 rounded bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">Update</button>
                            </div>
                            <div className="flex justify-between gap-4">
                                <label class="block">
                                    <span class="relative mt-1.5 flex">
                                        <input
                                            class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                            // value={paymentPrices.monthly}
                                            // onChange={handlepaymentPriceChange}
                                            name="monthly"
                                            type="number"
                                            step={0.01}
                                        />
                                        <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                                            <i class="text-base">R</i>
                                        </span>
                                    </span>

                                </label>
                                <label class="block">
                                    <span class="relative mt-1.5 flex">
                                        <input
                                            class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                            // value={user.username}
                                            name="d_monthly"
                                            type="number"
                                            step={0.01}
                                        />
                                        <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                                            <i class="text-base">$</i>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                        
                        <div className="rounded-lg col-span-2 bg-slate-150 p-4 dark:bg-navy-700 text-xs">
                            <div className="flex justify-between gap-4">
                                <span>Annual</span>
                                <button 
                                // onClick={handleSavePaymentPrice}
                                 class="btn py-0 rounded bg-primary font-medium text-white hover:bg-primary-focus focus:bg-primary-focus active:bg-primary-focus/90 dark:bg-accent dark:hover:bg-accent-focus dark:focus:bg-accent-focus dark:active:bg-accent/90">Update</button>
                            </div>
                            <div className="flex justify-between gap-4">
                                <label class="block">
                                    <span class="relative mt-1.5 flex">
                                        <input
                                            class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                            // value={paymentPrices.yearly}
                                            // onChange={handlepaymentPriceChange}
                                            name="yearly"
                                            type="number"
                                            step={0.01}
                                        />
                                        <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                                            <i class="text-base">R</i>
                                        </span>
                                    </span>

                                </label>
                                <label class="block">
                                    <span class="relative mt-1.5 flex">
                                        <input
                                            class="form-input peer w-full rounded-lg border border-slate-300 bg-transparent px-3 py-2 pl-9 placeholder:text-slate-400/70 hover:border-slate-400 focus:border-primary dark:border-navy-450 dark:hover:border-navy-400 dark:focus:border-accent"
                                            // value={user.username}
                                            name="d_yearly"
                                            type="number"
                                            step={0.01}
                                        />
                                        <span class="pointer-events-none absolute flex h-full w-10 items-center justify-center text-slate-400 peer-focus:text-primary dark:text-navy-300 dark:peer-focus:text-accent">
                                            <i class="text-base">$</i>
                                        </span>
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <div>
      <Users allUsers={allUsers} />
    </div>
    </>
  )
}
