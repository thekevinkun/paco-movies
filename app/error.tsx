"use client";

const Error = () => {
  return (
    <>
      <div className="max-sm:px-10 h-full mx-auto 
          max-lg:min-h-[94vh] flex flex-col items-center justify-center"
      >
        <h2 className="font-medium text-lg max-md:text-base max-2xs:text-sm text-danger text-center">
          Something went wrong!
          There may be a problem with the server. <br />
          Please try again later.
        </h2>
      </div>
    </>
  );
};

export default Error;
