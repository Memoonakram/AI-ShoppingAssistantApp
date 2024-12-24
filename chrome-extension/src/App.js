import './App.css';
import './static/fonts/iconfonts/font-awesome/stylesheet.css'
import React, { useState, useEffect, use } from 'react';
import vid from './static/video/bg_vid2.gif';
import { avatars2 } from './static/images/avater/avatar';
import { Tabs } from './static/tabs/tabs';
import { apiService, FRONTEND_URL } from './service';

function App() {
  const api = apiService();

  const [isloading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [avatar, setAvatar] = useState(avatars2['f1']);
  const [currentlocation, setCurrentLocation] = useState(null);
  const [allFav, setAllFav] = useState([]);
  const [fav, setFav] = useState(false);
  const [stock, setStock] = useState(false);

  const handleFavClick = async () => {
    setIsLoading(true);
    const favBtn = document.querySelector(".fav-btn");
    const svg = favBtn.querySelector("svg");
    const g = svg.querySelector("g");
    const path = svg.querySelector("path");
    if (path.getAttribute("fill") === "none") {
      path.setAttribute("fill", "#e53e3e");
      g.setAttribute("stroke", "#e53e3e");

      const res = await api.createUserFav({
        user: userData.id, 
        url: currentlocation,
        is_favourite: true,
      })
      if (res && res.success) {
      setAllFav([...allFav, res.data]);
      await chrome.storage.local.set({ userFavs: [...allFav, res.data] });
      let favData = await api.fetchDataFromChromeStorage('userFavs');
      console.log('favData setfav', favData);
      setFav(res.data);
      }
    } else {
      path.setAttribute("fill", "none");
      g.setAttribute("stroke", "#1C274C");
      if (fav && fav.is_favourite) {
        const res = await api.deleteUserFav(fav.id);
        console.log(res);
        if (res && res.success) {
        setAllFav(allFav.filter((f) => f.id !== fav.id));
        await chrome.storage.local.set({ userFavs: allFav.filter((f) => f.id !== fav.id) });
        }
      }
    }
    console.log('fav clicked');
    setIsLoading(false);
  }

  const handleStockClick = async () => {
    setIsLoading(true);
    const stockBtn = document.getElementById("stock-watch");
    stockBtn.disabled = true;
    const res = await api.createUserFav({
      user: userData.id,
      url: currentlocation,
      is_stockwatch: true,
    })
    if (res && res.success) {
    setAllFav([...allFav, res.data]);
    await chrome.storage.local.set({ userFavs: [...allFav, res.data] });
    setStock(res.data);
    }
    console.log('stock clicked');
    setIsLoading(false);
  }

  // stock watch disabled button on load and disable it if the user has already added the url to stock watch
  useEffect(() => {
    const stockBtn = document.getElementById("stock-watch");
    if (stock && stock.is_stock) {
      stockBtn.disabled = true;
    }
  }, [stock]);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const data = await api.fetchDataFromChromeStorage('userData');
      if (data && data.success) {
        setUserData(data.data[0]);
        setAvatar(avatars2[data.data[0].profile.profile_pic]);
      }
      const [currentTab] = await new Promise((resolve) => 
        chrome.tabs.query({ active: true, currentWindow: true }, resolve)
      );
      setCurrentLocation(currentTab.url);
      let favData = await api.fetchDataFromChromeStorage('userFavs');
      console.log('favData', favData);
      if (favData) {
        if (favData.success) {
          favData = favData.data;
        }
        setAllFav(favData);
        const fav = favData.find((fav) => fav.url === currentTab.url);
        if (fav && fav.is_favourite) {
          setFav(fav);
          const favBtn = document.querySelector(".fav-btn");
          const svg = favBtn.querySelector("svg");
          const g = svg.querySelector("g");
          const path = svg.querySelector("path");
          path.setAttribute("fill", "#e53e3e");
          g.setAttribute("stroke", "#e53e3e");
        }
        if (fav && fav.is_stockwatch) {
          setStock(fav);
          const stockBtn = document.getElementById("stock-watch");
          stockBtn.disabled = true;
        }
      }
      setIsLoading(false);
    }
    fetchData();
  }, []);



  return (
    <div>
      <div className="relative w-[300px]">
        {isloading && <Loading />}
        <div
          className="h-[100px] w-full bg-cover bg-center bg-no-repeat flex justify-center items-center"
          style={{
            backgroundImage: `url(${vid})`,
          }}
        >
          <h1 className="ml-5 text-white tracking-[.5em] alex-brush-regular text-3xl">
            SizeYami
          </h1>
        </div>
        {userData ? (
          <Content
            handleFavClick={handleFavClick}
            handleStockClick={handleStockClick}
            userData={userData}
            avatar={avatar}
          />
        ) : (
          <div className="flex justify-center items-center h-16 mx-4">
            Please Login to Website to continue
          </div>
        )}
      </div>
    </div>

  );
}

const Loading = () => {
  return (
    <div className="absolute h-full w-full bg-black/20">
      <svg className="absolute top-50 left-50 transform-translate-x-y-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" width="108" height="108" style={{ shapeRendering: 'auto', display: 'absolute', background: 'transparent' }}>
        <g>
          <circle fill="#6366f1" r="12" cy="26" cx="50">
            <animate values="26;74;26" keyTimes="0;0.5;1" keySplines="0.45 0 0.9 0.55;0 0.45 0.55 0.9" calcMode="spline" repeatCount="indefinite" dur="0.6369426751592356s" attributeName="cy" />
          </circle>
        </g>
      </svg>

    </div>
  );
}


const Content = ({ handleFavClick, handleStockClick, userData, avatar, }) => {

  const [gender, setGender] = useState('F');
  const [tab, setTab] = useState('tab1');

  useEffect(() => {
    if (userData && userData.profile) {
      setGender(userData.profile.gender || 'F');
    }
  }, [userData]);

  const handleLogout = async () => {
    await chrome.storage.local.remove('userData');
    await chrome.storage.local.remove('userFavs');
    chrome.tabs.create({ url: FRONTEND_URL + "logout" });
  }

  return (
    <>
      <div className="px-2 flex justify-between">
        <div className="flex">
          <img
            src={avatar}
            alt="avatar"
            className="w-20 h-20 rounded-full mt-[-2.4rem] border-2 border-white"
          />

          <p className="text-center ml-2 mt-1">{userData.username}</p>
          {/* <p className="text-center ml-2">Test</p> */}
        </div>
        <div className="-mt-[0.8em]">
          <button
            // on click open a new tab with the url
            onClick={() => {
              chrome.tabs.create({ url: FRONTEND_URL + "user/profile/" });
            }}
            className="rounded-md py-1 px-3 bg-indigo-500 text-xs flex border border-white text-white justify-center align-center">
            Edit Profile
            <i className="fas fa-arrow-up-right-from-square ml-2"></i>
          </button>

          <button onClick={handleLogout}
            className="rounded-md py-1 px-3 bg-red-500 text-xs flex border border-white text-white justify-center align-center ml-2">
            Logout
            <i className="fas fa-sign-out-alt ml-2"></i>
          </button>
        </div>
      </div>

      <div className="px-3 mt-2 flex justify-between align-center">
        <button id='stock-watch'
          onClick={handleStockClick}
          // disabled
          className="px-4 py-1.5 flex justify-center align-center bg-indigo-500 rounded-md text-xs text-white"
        >
          Stock Watch
          <i className="far fa-clock ml-2"></i>
        </button>
        <div>
          <button
            onClick={handleFavClick}
            className="m-0 p-0 flex align-center fav-btn"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke="#1C274C"
                stroke-width="2"
              >
                <path
                  d="M2 9.1371C2 14 6.01943 16.5914 8.96173 18.9109C10 19.7294 11 20.5 12 20.5C13 20.5 14 19.7294 15.0383 18.9109C17.9806 16.5914 22 14 22 9.1371C22 4.27416 16.4998 0.825464 12 5.50063C7.50016 0.825464 2 4.27416 2 9.1371Z"
                  fill="none"
                ></path>
              </g>
            </svg>
          </button>
        </div>
      </div>

      <div class="m-4 text-xs">
        <div class="w-full rounded-t-xl border border-gray-200 bg-gray-50 p-1">
          <div class="col-span-1 items-center justify-center space-x-4 flex">
            <button
              className={"w-8 h-8 flex justify-center items-center bg-slate-200 hover:bg-slate-300 hover:border-2 border-slate-500 rounded-md " + (tab === "tab1" ? "bg-slate-300 border-2" : "")}
              onClick={() => setTab("tab1")}
            >
              <img src={Tabs[gender]["tab1"]["icon"]} className="h-7" />
            </button>
            <button
              className={"w-8 h-8 flex justify-center items-center bg-slate-200 hover:bg-slate-300 hover:border-2 border-slate-500 rounded-md " + (tab === "tab2" ? "bg-slate-300 border-2" : "")}
              onClick={() => setTab("tab2")}
            >
              <img src={Tabs[gender]["tab2"]["icon"]} className="h-7" />
            </button>
            <button
              className={"w-8 h-8 flex justify-center items-center bg-slate-200 hover:bg-slate-300 hover:border-2 border-slate-500 rounded-md " + (tab === "tab3" ? "bg-slate-300 border-2" : "")}
              onClick={() => setTab("tab3")}
            >
              <img src={Tabs[gender]["tab3"]["icon"]} className="h-7" />
            </button>
          </div>
        </div>

        <div class="overflow-x-auto text-xs mb-2">
          <table class="w-full text-left text-gray-600">
            <thead class="uppercase text-gray-700 ">
              <tr class="border-b bg-slate-200">
                <th scope="col" class="px-3 py-2">Measurements</th>
                <th scope="col" class="px-3 py-2">In</th>
                {/* <th scope="col" class="px-3 py-2">CM</th> */}
              </tr>
            </thead>
            <tbody>
              {tab === "tab1" &&
                <>
                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Chest</th>
                    <td className="px-3 py-2">{userData.measurement.chest}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Shoulder</th>
                    <td className="px-3 py-2">{userData.measurement.shoulder}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Sleeve</th>
                    <td className="px-3 py-2">{userData.measurement.sleeve}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Wrist</th>
                    <td className="px-3 py-2">{userData.measurement.wrist}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Waist</th>
                    <td className="px-3 py-2">{userData.measurement.waist}</td>
                  </tr>
                </>
              }

              {tab === "tab2" &&
                <>
                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Waist</th>
                    <td className="px-3 py-2">{userData.measurement.waist}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Hip</th>
                    <td className="px-3 py-2">{userData.measurement.hip}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Inseam</th>
                    <td className="px-3 py-2">{userData.measurement.inseam}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Thigh</th>
                    <td className="px-3 py-2">{userData.measurement.thigh}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Knee</th>
                    <td className="px-3 py-2">{userData.measurement.knee}</td>
                  </tr>

                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Outseam</th>
                    <td className="px-3 py-2">{userData.measurement.outseam}</td>
                  </tr>
                </>
              }

              {tab === "tab3" &&
                <>
                  <tr className="border-b">
                    <th scope="row" className="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Foot</th>
                    <td className="px-3 py-2">{userData.measurement.foot}</td>
                  </tr>
                </>
              }

            </tbody>
          </table>
        </div>
      </div>

    </>
  )
}


export default App;
