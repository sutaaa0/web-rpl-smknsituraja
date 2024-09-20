import LandingPage from "./pages/LandingPage/page";

export default function Home() {
  return (
    <div className="dark:bg-black bg-white w-full h-full">
      <div className="mx-auto flex justify-center items-center w-full h-auto  sm:p-24">
        <LandingPage />
      </div>
    </div>
  );
}
