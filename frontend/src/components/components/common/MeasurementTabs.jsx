import React from 'react'
import { Tabs } from '../../../static/images/tabs/tabs'

export const TabsMenu = ({ gender, tab, handleTab }) => {
    return (
        <div className="flex items-center space-x-2 justify-around mt-4">
            <button
                className={
                    "w-12 h-12 flex justify-center items-center hover:bg-primary/20 dark:hover:bg-navy-300/20 rounded-lg " +
                    (tab === "tab1" ? "tab-active" : "")
                }
                onClick={() => handleTab("tab1")}
            >
                <img
                    src={Tabs[gender? gender : 'M']["tab1"]["icon"]}
                    className="h-10 dark:invert-75 "
                />
            </button>

            <button
                className={
                    "w-12 h-12 flex justify-center items-center hover:bg-primary/20 dark:hover:bg-navy-300/20 rounded-lg " +
                    (tab === "tab2" ? "tab-active" : "")
                }
                onClick={() => handleTab("tab2")}
            >
                <img
                    src={Tabs[gender? gender : 'M']["tab2"]["icon"]}
                    className="h-10 dark:invert-75 "
                />
            </button>

            <button
                className={
                    "w-12 h-12 flex justify-center items-center hover:bg-primary/20 dark:hover:bg-navy-300/20 rounded-lg " +
                    (tab === "tab3" ? "tab-active" : "")
                }
                onClick={() => handleTab("tab3")}
            >
                <img
                    src={Tabs[gender? gender : 'M']["tab3"]["icon"]}
                    className="h-10 dark:invert-75 "
                />
            </button>

            <button
                className={
                    "w-12 h-12 flex justify-center items-center hover:bg-primary/20 dark:hover:bg-navy-300/20 rounded-lg " +
                    (tab === "tab4" ? "tab-active" : "")
                }
                onClick={() => handleTab("tab4")}
            >
                <img
                    src={Tabs[gender? gender : 'M']["tab4"]["icon"]}
                    className="h-10 dark:invert-75 "
                />
            </button>
        </div>

    )
}
    
