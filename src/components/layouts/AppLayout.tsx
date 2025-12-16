import { Outlet } from "react-router";

function AppLayout() {
  return (
    <div className="bg-grid dark:bg-ui-black bg-ui-white flex h-full w-full items-center justify-center overscroll-none lg:p-8 xl:p-10">
      <div className="grid h-full w-full lg:h-fit lg:max-w-[640px]">
        <div className="bg-ui-white grid p-4 pt-8 pb-20 lg:rounded-4xl lg:border lg:px-12 lg:pb-14 lg:shadow-sm xl:px-16 xl:pt-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AppLayout;
