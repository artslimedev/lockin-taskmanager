import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <div className="rounded-full h-8 w-8 hover:h-10 hover:w-10">
      {/* <img src="" className="rounded-full h-8 w-8 hover:h-10 hover:w-10" /> */}
      <Image
        src="https://avatar.vercel.sh/59283.png"
        height={32}
        width={32}
        alt="avatar"
      />
    </div>
  );
};

export default Avatar;
