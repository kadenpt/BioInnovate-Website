import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <div style={{ 
      backgroundColor: "#b0d5df", 
      position: "fixed", 
      top: 0, 
      left: 0, 
      right: 0, 
      zIndex: 1000,
      padding: "10px 20px"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%"
      }}>
        <NavLink to="/"  style={{
          fontFamily: "Quicksand",
          fontSize: "16px",
          color: "#226897",
        }}>
          ABOUT US
        </NavLink>
        <NavLink to="/events" style={{
          fontFamily: "Quicksand",
          fontSize: "16px",
          color: "#226897",
        }}>
          EVENTS
        </NavLink>
        <h1 style={{
          color:"#226897",
          fontFamily: "Anton",
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "0"
        }}>BioInnovate UBC</h1>
        <NavLink to="/bioblog" style={{
          fontFamily: "Quicksand",
          fontSize: "16px",
          color: "#226897",
        }}>
          BIOBLOG
        </NavLink>
        <NavLink to="/getinvolved" style={{
          fontFamily: "Quicksand",
          fontSize: "16px",
          color: "#226897",
        }}>
          GET INVOLVED
        </NavLink>
      </div>
    </div>
  );
}