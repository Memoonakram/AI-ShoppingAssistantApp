import React, { useEffect, useState } from 'react'
import { ButtonElement, InputElement, SelectElement } from '../elements/FormElements';
import { TabsMenu } from './MeasurementTabs';
import { Tabs } from '../../../static/images/tabs/tabs';
import { SwalAlert } from '../elements/SwalAlert';


export const MeasurementView = ({ measurementData, profileData, onSave }) => {

  const [editMode, setEditMode] = useState(false);
  const [tab, setTab] = useState("tab1");
  const [measurement, setMeasurement] = useState({
    "id": 0,
    "chest": 0,
    "shoulder": 0,
    "sleeve": 0,
    "wrist": 0,
    "waist": 0,
    "hip": 0,
    "inseam": 0,
    "thigh": 0,
    "knee": 0,
    "outseam": 0,
    "foot": 0,
    "last_modified": "",
    "user": 0
  });
  const [profile, setProfile] = useState({
    "id": 0,
    "gender": 'M',
    "country": '',
    "age": 0,
    "plan_type": "Free",
    "dob": '',
    "last_modified": '',
    "profile_pic": "",
    "user": 0,
    "username": "",
    "first_name": "",
    "last_name": "",
    "email": "",
  });

  useEffect(() => {
    if (measurementData) {
      setMeasurement(measurementData);
    }
    if (profileData) {
      setProfile(profileData);
    }
  }, [measurementData, profileData]);

  const handleeditMode = () => {
    setEditMode(!editMode);
  }

  const handleCancel = () => {
    setEditMode(false);
    setProfile(profileData);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeasurement(prevMeasurement => ({
      ...prevMeasurement,
      [name]: value
    }));
  }

  const handleSave = (e) => {
    e.preventDefault();
    if (!validateData()) {
      SwalAlert("Error", "Please Fill all the fields", 2000, "error", false);
      return;
    }
    setTab("tab1");
    onSave(measurement);
    setEditMode(false);
}

const validateData = () => {
  const { chest, shoulder, sleeve, wrist, waist, hip, inseam, thigh, knee, outseam, foot } = measurement;
  if (chest == 0 || shoulder == 0 || sleeve == 0 || wrist == 0 || waist == 0 || hip == 0 || inseam == 0 || thigh == 0 || knee == 0 || outseam == 0 || foot == 0) {
    return false;
  }
  return true;
}



  return (
      <div className="mx-4 md:flex dark:border-navy-700 dark:bg-navy-800 rounded-2xl h-screen">
        <div className="md:w-7/12 flex flex-col h-full ">
            <div className="card md:flex md:justify-between shadow-sm px-3 py-3 ">
            <div class="flex justify-end space-x-2 md:mr-4">
                  {!editMode ? (
                  <ButtonElement
                    onClick={handleeditMode}
                    label="Edit"
                    iconclassName="fa fa-edit text-white"
                    primary
                  />
                ) : (
                  <>
                  <ButtonElement
                    onClick={handleCancel}
                    label="Cancel"
                    iconclassName="fa fa-times"
                  />

                  <ButtonElement
                    onClick={handleSave}
                    label="Save"
                    iconclassName="fa fa-save text-white"
                    primary
                  /></>
                  )}

                </div>
                
                <TabsMenu 
                  gender={profile.gender || "M"}
                  tab={tab}
                  handleTab={setTab}
                />
                
            </div>
            <div className="my-2 overflow-y-auto pb-2 ">
              <div className="mt-4 space-y-4 px-8">
                <TabContent
                  tab={tab}
                  editMode={editMode}
                  handleChange={handleChange}
                  measurements={measurement}
                />

                {/* next and previuis buttons */}
{ editMode &&
                <div className="flex justify-between mt-4 space-x-2">
                  <ButtonElement
                    label="Previous"
                    onClick={() => setTab(`tab${parseInt(tab.match(/\d+/)[0]) - 1}`)}
                    iconclassName="fa fa-chevron-left"
                    disabled={tab === "tab1"}
                  />
                  <ButtonElement
                    label="Next"
                    onClick={() => setTab(`tab${parseInt(tab.match(/\d+/)[0]) + 1}`)}
                    rightIcon={true}
                    iconclassName="fa fa-chevron-right"
                    disabled={tab === "tab3"}
                  />
                  </div>
}

              </div>
            </div>
        </div>
        <div className={`md:w-10/12 hidden sm:flex justify-center bg-${profile.gender}-character rounded-r-2xl`}>
        <img src={Tabs[profile?.gender][tab]["img"]} className="h-full" />
        </div>
      </div>
  )
}

const TabContent = ({ tab, editMode, handleChange, measurements }) => {

return (
  <>
  {tab === "tab1" && (
    <>
  <InputElement
    label="Chest"
    name="chest"
    value={measurements.chest}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Shoulder"
    name="shoulder"
    value={measurements.shoulder}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Sleeve"
    name="sleeve"
    value={measurements.sleeve}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Wrist"
    name="wrist"
    value={measurements.wrist}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Waist"
    name="waist"
    value={measurements.waist}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />
  </>
  )
  }

{ tab === "tab2" && (<>

  <InputElement
    label="Hip"
    name="hip"
    value={measurements.hip}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Inseam"
    name="inseam"
    value={measurements.inseam}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Thigh"
    name="thigh"
    value={measurements.thigh}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Knee"
    name="knee"
    value={measurements.knee}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />

  <InputElement
    label="Outseam"
    name="outseam"
    value={measurements.outseam}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />
</>)}



{ tab === "tab3" && (
  <InputElement
    label="Foot"
    name="foot"
    value={measurements.foot}
    handleChange={handleChange}
    disabled={!editMode}
    type='number'
    step={0.1}
    svg={measurementsvg()}
  />)}


  </>
)};


const measurementsvg = () => {
  return (
    <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentcolor"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <style type="text/css"> </style>{" "}
                  <g>
                    {" "}
                    <path
                      className="st0"
                      d="M180.365,271.776c-39.859-0.008-76.916-5.275-107.957-14.441c-31.032-9.206-56.113-22.114-72.078-38.516 L0,218.456v112.696c0.008,8.671,3.948,17.392,12.463,26.235c8.473,8.779,21.405,17.219,37.774,24.356 c19.056,8.34,42.794,14.852,69.309,18.89v-70.001h16.88v72.178c12.008,1.286,24.463,2.044,37.28,2.242v-40.239h16.88v40.388h37.271 v-74.568h16.88v74.568h37.271v-40.388h16.88v40.388h37.28v-74.568h16.88v74.568h37.28v-40.388h16.88v40.388h37.271v-74.568h16.88 v74.568H512V271.776H180.365z"
                    ></path>{" "}
                    <path
                      className="st0"
                      d="M295.774,254.896h64.948v-36.439l-0.33,0.362c-10.64,10.963-25.353,20.292-43.148,28.082 C310.56,249.818,303.298,252.438,295.774,254.896z"
                    ></path>{" "}
                    <path
                      className="st0"
                      d="M50.237,231.438c32.738,14.324,78.993,23.474,130.128,23.458c38.352,0,73.942-5.11,103.169-13.748 c29.235-8.58,52.033-20.87,64.726-34.066c8.514-8.843,12.454-17.564,12.462-26.235c-0.008-8.679-3.948-17.391-12.462-26.235 c-8.473-8.778-21.405-17.218-37.774-24.356c-32.738-14.334-78.993-23.482-130.12-23.457c-38.351-0.008-73.949,5.11-103.176,13.74 c-29.234,8.58-52.033,20.87-64.726,34.073C3.948,163.456,0.008,172.168,0,180.847c0.008,8.671,3.948,17.392,12.463,26.235 C20.936,215.86,33.868,224.3,50.237,231.438z M121.879,174.814c3.684-3.898,11.431-8.258,21.71-11.242 c10.27-3.034,23.021-4.888,36.776-4.88c18.331-0.024,34.898,3.314,46.149,8.258c5.621,2.44,9.866,5.292,12.322,7.864 c2.505,2.629,3.124,4.516,3.132,6.033c-0.008,1.508-0.627,3.404-3.132,6.034c-3.676,3.89-11.424,8.259-21.702,11.242 c-10.27,3.033-23.013,4.879-36.769,4.879c-18.338,0.017-34.906-3.314-46.156-8.259c-5.621-2.44-9.866-5.291-12.33-7.863 c-2.506-2.63-3.116-4.526-3.125-6.034C118.763,179.33,119.373,177.443,121.879,174.814z"
                    ></path>{" "}
                  </g>{" "}
                </g>
              </svg>
  )
}