import { useEffect } from "react";



import { useSelector } from "react-redux";


import { RootState } from "../store/store";



const ProfilePage = () => {


  const userInfo = useSelector((state: RootState) => state.auth.userInfo);


  const initData = useSelector((state: RootState) => state.auth.initData);


  const token = useSelector((state: RootState) => state.auth.token);





  console.log("userInfo:", userInfo);


  console.log("initData:", initData);


  console.log("token:", token);




  useEffect(() => {

    window.Telegram.WebApp.expand();

  }, []);



  const renderUserInfo = () => {
    // if (!userInfo) return <></>;

    return (
      <div className="flex flex-col items-center gap-6 p-7 md:flex-row md:gap-8 rounded-2xl">
        <div>
          <img
            className="size-48 shadow-xl rounded-md"
            alt="Profile Pic"
            src="https://t.me/i/userpic/320/QKA6yq3RmRiBS_p4XCDgcr8Df6dMFrxLvLJhz9laA8U.svg"
          />
        </div>
        <div className="flex flex-col items-center">
          <span className="text-2xl font-medium">Sopheak Men</span>
          <span className="font-medium text-sky-500">Chat ID: 569980646</span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col items-center p-4 w-full">
      <h1 className="text-xl font-bold text-amber-600">Mini App</h1>
      {renderUserInfo()}
    </div>
  );
};

export default ProfilePage;
