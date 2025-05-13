import Image from "next/image";
import React from "react";

const Avatar = () => {
  return (
    <div>
      <Image
        src="public/avatar.png"
        height={32}
        width={32}
        alt="avatar"
        className="rounded-full h-8 w-8 hover:h-10 hover:w-10"
      />
    </div>
  );
};

export default Avatar;
