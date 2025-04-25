import { footerSections, socialLinks } from "../constants/dataItems";

const Footer: React.FC = () => {
    return (
      <footer className=" bg-slate-950">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="md:flex md:justify-between ">
            <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-4">
              {footerSections.map((section) => (
                <div key={section.title} className=" justify-items-center justify-center">
                  <h2 className="mb-6 text-sm font-semibold uppercase text-white">
                    {section.title}
                  </h2>
                  <ul className="text-white  font-light">
                    {section.links.map((link) => (
                      <li key={link.label} className="mb-4">
                        <a href={link.href} className="hover:underline">
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <hr className="my-6  sm:mx-auto border-gray-700 lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
              © 2025 <a href="#" className="hover:underline">REPO™</a>. All Rights Reserved by coderlog.
            </span>
            <div className="flex mt-4 sm:justify-center sm:mt-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-500  hover:text-white ms-5"
                  aria-label={social.name}
                >
                  <svg
                    className="w-4 h-4"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;