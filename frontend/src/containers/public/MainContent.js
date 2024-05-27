import React from "react";
import FormSearch from "./FormSearch";

const MainContent = () => {
  return (
    <div>
      <div
        className="bg-cover bg-center w-full h-[320px] "
        style={{
          backgroundImage:
            'url("https://cdn6.agoda.net/images/MVC/default/background_image/illustrations/bg-agoda-homepage.png")',
        }}
      ></div>
      <div className="w-1124 m-auto h-full flex justify-center flex-row">
        <FormSearch />
      </div>
      <div className="mt-20 w-1124 m-auto h-full flex justify-center flex-row">
        agsgasg
      </div>
    </div>
  );
};

export default MainContent;
