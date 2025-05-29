import React from "react";
import AddcarForm from "./AddcarForm";

const AddCar: React.FC = () => {
  return (
    <div className="w-full px-6 py-10">
      <div className="flex md:flex-row flex-col gap-3">
        <div className="flex-none w-48">
          <h1 className="text-2xl font-oswald font-semibold">Add Car</h1>
        </div>
        <div className="grow">
          <AddcarForm />
        </div>
        <div className="flex-none w-48 hidden md:block">&nbsp;</div>
      </div>
    </div>
  );
};

export default AddCar;
