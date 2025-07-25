import gsap from "gsap";
import { useState, useRef, useEffect } from "react";
import Button from "./Button";
import LiquidButton from "./LiquidButton";
import { TiLocationArrow } from "react-icons/ti";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

function Hero() {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [hasClicked, setHasClicked] = useState(false);

  const [loading, setLoading] = useState(true);
  const [loadedVideos, setLoadedVideos] = useState(0);

  const totalVideos = 3;
  const nextVdRef = useRef(null);

  const handleVideoLoad = () => {
    setLoadedVideos((prev) => prev + 1);
  };

  const handleMiniVdClick = () => {
    setHasClicked(true);
    setCurrentIndex((prevIndex) => (prevIndex % totalVideos) + 1);
  };

  // Direct download handler
  const handleDirectDownload = () => {
    const downloadUrl =
      "https://valorant.secure.dyn.riotcdn.net/channels/public/x/installer/current/live.live.ap.exe";

    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = downloadUrl;
    link.download = "valorant-installer.exe"; // Optional: specify filename

    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    if (loadedVideos === totalVideos - 1) {
      setLoading(false);
    }
  }, [loadedVideos]);

  useGSAP(
    () => {
      if (hasClicked) {
        gsap.set("#next-video", { visibility: "visible" });
        gsap.to("#next-video", {
          transformOrigin: "center center",
          scale: 1,
          width: "100%",
          height: "100%",
          duration: 1,
          ease: "power1.inOut",
          onStart: () => nextVdRef.current.play(),
        });
        gsap.from("#current-video", {
          transformOrigin: "center center",
          scale: 0,
          duration: 1.5,
          ease: "power1.inOut",
        });
      }
    },
    {
      dependencies: [currentIndex],
      revertOnUpdate: true,
    }
  );

  useGSAP(() => {
    gsap.set("#video-frame", {
      clipPath: "polygon(14% 0, 72% 0, 88% 90%, 0 95%)",
      borderRadius: "0% 0% 40% 10%",
    });
    gsap.from("#video-frame", {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      borderRadius: "0% 0% 0% 0%",
      ease: "power1.inOut",
      scrollTrigger: {
        trigger: "#video-frame",
        start: "center center",
        end: "bottom center",
        scrub: true,
      },
    });
  });

  useGSAP(() => {
    const fulls = document.getElementById("fulls");
    fulls?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 400;
      const yMove = (e.clientY / window.innerWidth - 0.5) * 400;
      gsap.to("#movee", {
        x: xMove * 0.3,
        y: yMove * 0.3,
      });
    });
  });

  const getVideoSrc = (index) => `videos/hero-${index}.mp4`;

  return (
    <div className="relative h-dvh w-screen overflow-x-hidden" id="fulls">
      {loading && (
        <div className="flex items-center justify-center absolute z-[100] h-dvh w-screen overflow-hidden bg-blue-75">
          <div className="three-body">
            <div className="three-body__dot" />
            <div className="three-body__dot" />
            <div className="three-body__dot" />
          </div>
        </div>
      )}
      <div
        id="video-frame"
        className="relative z-10 h-dvh w-screen overflow-hidden rounded-lg bg-blue-75"
      >
        <div>
          <div
            className="mask-clip-path absolute-center absolute z-50 size-72 cursor-pointer overflow-hidden rounded-lg hover:border-2 border-black-900"
            id="movee"
          >
            <div
              onClick={handleMiniVdClick}
              className="origin-center scale-50 opacity-0 transition-all duration-500 ease-in hover:scale-100 hover:opacity-100"
            >
              <video
                ref={nextVdRef}
                src={getVideoSrc((currentIndex % totalVideos) + 1)}
                loop
                muted
                id="current-video"
                className="size-64 origin-center scale-150 object-cover object-center"
                onLoadedData={handleVideoLoad}
              />
            </div>
          </div>

          <video
            ref={nextVdRef}
            src={getVideoSrc(currentIndex)}
            loop
            muted
            id="next-video"
            className="absolute-center invisible absolute z-20 size-64 object-cover object-center"
            onLoadedData={handleVideoLoad}
          />

          <video // src={getVideoSrc(currentIndex === totalVideos - 1 ? 1 : currentIndex)}
            src={getVideoSrc(currentIndex)}
            autoPlay
            loop
            muted
            className="absolute left-0 top-0 size-full object-cover object-center"
            onLoadedData={handleVideoLoad}
          />
        </div>
        <h1 className="text-8xl font-thin special-font hero-heading absolute bottom-12 right-10 z-40 text-blue-75">
          <b>5V5</b>
        </h1>
        <h1 className="text-4xl font-thin special-font hero-heading absolute bottom-4 right-10 z-40 text-blue-75">
          <b>Tactical shooter</b>
        </h1>
        <div className="absolute left-0 top-0 z-40 size-full">
          <div className="mt-24 px-5 sm:px-10">
            <h1 className="mt-20 text-7xl font-valorant font-thin hero-heading text-blue-75 absolute top-10 left-10 hover:text-red-500">
              <b>Valorant</b>
            </h1>
            {/* <p className="ml-5 mb-5 max-w-64 font-robertr text-blue-50 text-center"><b>Tactical shooter featuring agents with unique abilities</b></p> */}
            <Button
              id="watch-trailer"
              title="watch Trailer"
              leftIcon={<TiLocationArrow />}
              containerClass="absolute top-[15dvh] left-10 bg-yellow-300 border-2 border-black-900 flex-center gap-1 hover:bg-violet-500 "
              onClick={() =>
                window.open(
                  "https://www.youtube.com/watch?v=gZPyHib9GNw",
                  "_blank"
                )
              }
            />
          </div>
        </div>
        <LiquidButton
          id="play-for-free"
          title="Play (windows)"
          containerClass="absolute top-[72vh] left-1/2 transform -translate-x-1/2 
                   border-2 border-white-900 px-14 py-7 shadow-2xl z-[999]"
          onClick={handleDirectDownload}
        />
      </div>
      <h1 className="text-8xl font-thin special-font hero-heading absolute bottom-12 right-10 text-black">
        <b>5V5</b>
      </h1>
      <h2 className="text-4xl font-thin special-font hero-heading absolute bottom-4 right-10 text-black">
        <b>Tactical shooter</b>
      </h2>
    </div>
  );
}

export default Hero;
