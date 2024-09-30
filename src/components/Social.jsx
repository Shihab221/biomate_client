import React from "react";

const Social = () => {
  const socialData = [
    {
      img: "https://static.vecteezy.com/system/resources/thumbnails/023/986/480/small_2x/youtube-logo-youtube-logo-transparent-youtube-icon-transparent-free-free-png.png",
      link: "https://youtube.com/@biomatehscadmissionbiology?feature=shared ",
      title: "Youtube Channel",
      description:
        "Visit and subscribe our youtube channel and get the best video classes for free ",
    },
    {
      img: "https://static.vecteezy.com/system/resources/previews/023/986/562/non_2x/telegram-logo-telegram-logo-transparent-telegram-icon-transparent-free-free-png.png",
      link: "https://t.me/bioMateOfficial",
      title: "Telegram Group",
      description:
        "Join in our telegram group to get tips and perticipate in competitive exam",
    },
    {
      img: "https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png",
      link: "https://www.facebook.com/profile.php?id=61558865072847",
      title: "Facebook Page",
      description:
        "Stay connected with our facebook page to get excited annoucement",
    },
    {
      img: "https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-facebook-social-media-icon-png-image_6315968.png",
      link: "https://www.facebook.com/groups/470102575488203/",
      title: "Facebook Group",
      description:
        "Join in our facebook group to get essential update and discussion ",
    },
  ];
  return (
    <div className="text-slate-700 flex flex-col items-center my-10">
      <h2 className="text-3xl font-bold text-center mb-10">
        Stay <span className="text-red-500">Connected</span> with BioMate
      </h2>

      {socialData.map((item) => (
        <div className="w-full border rounded-md flex my-2 hover:scale-105 transition-transform max-w-xl ">
          <a href={item.link} className="flex">
            <img
              src={item.img}
              alt="logo social"
              className="border m-2 w-24 h-24 rounded-md"
            />
            <span className="border my-2 ml-0 mr-2 rounded-md py-2 px-2 flex flex-col">
              <h6 className="font-bold text-red-500">{item.title}</h6>
              <p className="max-w-xl">{item.description}</p>
            </span>
          </a>
        </div>
      ))}
    </div>
  );
};

export default Social;
