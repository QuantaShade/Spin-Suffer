import { Link } from "react-router-dom"
import { FaGithub, FaHeart } from "react-icons/fa"
import { gameName } from "@/lib"

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-black">

      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-10 md:flex-row md:items-center md:justify-between">

        {/* Left */}

        <div>
          <h3 className="text-xl font-black text-white">
            { gameName }
            <span className="text-[#ff167b]"> Challenge</span>
          </h3>

          <p className="mt-2 text-sm text-gray-500">
            Spin the wheel.  Survive the game.

.
          </p>
        </div>

        {/* Center */}

        <div className="flex gap-6 text-gray-400">

          <Link
            to="/"
            className="transition duration-300 hover:text-[#ff167b]"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="transition duration-300 hover:text-[#ff167b]"
          >
            About
          </Link>

          <Link
            to="/contact"
            className="transition duration-300 hover:text-[#ff167b]"
          >
            Contact
          </Link>

        </div>

        {/* Right */}

        <Link
          to="https://github.com/Quantashade"
          target="_blank"
          className="group flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-gray-300 transition-all duration-300 hover:border-[#ff167b] hover:bg-[#ff167b]/10"
        >
          <FaGithub className="text-xl group-hover:text-[#ff167b]" />

          <span>View Source</span>
        </Link>

      </div>

      {/* Bottom */}

      <div className="border-t border-white/10 py-5 text-center text-sm text-gray-500">
        Made with{" "}
        <FaHeart className="inline text-[#ff167b]" /> by Mustafa
      </div>

    </footer>
  )
}

export default Footer