import React from "react";
import offlineImg from "../assets/offline.jpg";
const Features = () => {
  return (
    <div className="py-10 flex flex-col justify-evenly font-poppins">
      <h2 className="px-5 py-5 text-slate-800  flex font-bold text-3xl text-center justify-center items-center">
        Offline Course
      </h2>
      <div className="py-10 flex flex-col sm:flex-row justify-around">
        <div className="flex flex-col justify-center">
          <p className="text-slate-700 text-xl px-5 py-10">
            আমাদের অফলাইন ব্যাচ <br />
            Place: ফরিদপুর UCC কোচিং <br />
            Date: শুক্র-রবি-মঙ্গল <br />
            Time: সকাল ৯-১১ 
          </p>
        </div>
        <img
          src={offlineImg}
          alt="offline_image"
          className="sm:w-[460px] h-auto rounded-xl p-5 sm:p-0"
        />
      </div>
    </div>
  );
};

export default Features;
