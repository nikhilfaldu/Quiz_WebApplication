
import { Link } from "react-router-dom";
import logoSvg from "../images/logpo.svg";
import Cookies from 'js-cookie';

const Navbar = ()=>{
  const usernamename =Cookies.get('clientusername');

    return (

        <div className="header">
        <div className="header-1">
          <table className="table">
            <tr className="headertr">
              <td className="headertd1">
                <img className="logo" src={logoSvg} alt="" />
              </td>
              <td className="headertd2">
                <img
                  className="profile"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?cs=srgb&dl=pexels-pixabay-220453.jpg&fm=jpg"
                  alt=""
                />
                <span className="hi">Hi ,</span>
                <span className="headertext">{usernamename}</span>
              </td>
            </tr>
          </table>
        </div>
        <div className="header-2 bg">
          <nav className="navbar navbar-expand-lg">
            <div className="container-fluid">
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul
                  className="navbar-nav ml-3"
                  style={{ display: "flex", alignItems: "center" }}
                >
                  <li className="nav-item">
                    <a
                      className="nav-link "
                      style={{ fontWeight: "bold" }}
                      aria-current="page"
                      href="#"
                    >
                      <svg
                        className="mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 576 512"
                      >
                        <style>{`svg{fill:#  color: #86ceff;}`}</style>
                        <path d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z" />
                      </svg>
                      <Link to="/"><span className="navbartext">Home </span></Link> 
                    </a>
                  </li>
                 

                  <li className="nav-item ml-5">
                    <a
                      className="nav-link"
                      style={{ color: "aliceblue", fontWeight: "bold" }}
                      href="rank.php"
                    >
                      <svg
                        className="mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 640 512"
                      >
                        <style>{`svg{fill:#ededed}`}</style>
                        <path d=" M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z" />
                      </svg>
                      <Link to="/history"><span className="navbartext3"> History </span></Link>
                      
                    </a>
                  </li>
             
                  <li className="nav-item ml-5">
                    <a
                      className="nav-link"
                      style={{ color: "aliceblue", fontWeight: "bold" }}
                    >
                      <svg
                        className="mb-2"
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 448 512"
                      >
                        {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                        <style>{`svg{fill:#ededed}`}</style>
                        <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                      </svg>
                      <Link to="/profile">
                      <span className="navbartext4"> Profile </span>
                      </Link>
                    </a>
                  </li>
    
                  <Link to="/login">
                    <li className="nav-item ml-5">
                      <a
                        className="nav-link"
                        style={{ color: "aliceblue", fontWeight: "bold" }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          height="1em"
                          viewBox="0 0 512 512"
                        >
                          {/* Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. */}
                          <style>{`svg{fill:#ededed}`}</style>
                          <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32z" />
                        </svg>
                        <span className="navbartext5"> LogOut </span>
                      </a>
                    </li>
                  </Link>
                </ul>
              </div>
            </div>
          </nav>
        </div>

        <p className="header3text ml-3 ">
          <h3>
            Test your knowledge, take the challenge and leave the rest!
          </h3>
        </p>
      </div>
     

    );
}

export default Navbar;