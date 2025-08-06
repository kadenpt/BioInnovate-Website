import HexagonProfile from './HexagonProfile';
import kadenImage from '../../assets/kaden.jpeg';
import tempBackground from '../../assets/tempBackground.png';

export default function AboutUs() {
  return (
    <>
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage: `url(${tempBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
      }} />
      <div style={{
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
        position: "relative",
        zIndex: 1,
      }}>
              <h1 style={{ alignSelf: "flex-start",
         fontFamily: "Anton",
         color: "#226897",
         fontSize: "40px",
         fontWeight: "bold",
         textAlign: "left",
         margin: "0"
         }}>WHO ARE WE</h1>
      <p style={{
        fontFamily: "Quicksand",
        fontSize: "16px",
        color: "#226897",
      }}>
        BioInnovate UBC is a student-run organization that provides a platform for students to learn about and engage with the biotechnology industry. We are a team of students from various disciplines who are passionate about biotechnology and innovation.
      </p>
                 <div style={{
           alignSelf: "flex-end",
           marginTop: "30px",
           textAlign: "right",
         }}>
           <h1 style={{
         fontFamily: "Anton",
         color: "#226897",
         fontSize: "40px",
         fontWeight: "bold",
         textAlign: "right",
         margin: "0"
         }}>OUR MISSION</h1>
        <p style={{
          fontFamily: "Quicksand",
          fontSize: "16px",
          color: "#226897",
        }}>
          Our mission is to provide a platform for students to learn about and engage with the biotechnology industry. We are a team of students from various disciplines who are passionate about biotechnology and innovation.
        </p>
       </div>
               <div style={{
         display: "flex",
         flexDirection: "column",
         alignItems: "center",
         justifyContent: "center",
         marginTop: "30px",
         width: "100%",
        }}>
         <h1 style={{
           fontFamily: "Anton",
           color: "#226897",
           fontSize: "40px",
           fontWeight: "bold",
           textAlign: "center",
           margin: "0"
         }}>OUR PEOPLE</h1>
            <div style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "20px",
            marginTop: "20px",
          }}>
            {/* First row - 2 profiles */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Kaden Primorac" jobTitle="President" imageSrc={kadenImage} />
              <HexagonProfile name="Kaden Primorac" jobTitle="Vice President" imageSrc={kadenImage} />
            </div>
            
            {/* Second row - 1 profile */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Kaden Primorac" jobTitle="Secretary" imageSrc={kadenImage} />
            </div>
            
            {/* Third row - 2 profiles */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Kaden Primorac" jobTitle="Treasurer" imageSrc={kadenImage} />
              <HexagonProfile name="Kaden Primorac" jobTitle="Events Coordinator" imageSrc={kadenImage} />
            </div>
            
            {/* Fourth row - 3 profiles */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Kaden Primorac" jobTitle="Marketing Director" imageSrc={kadenImage} />
              <HexagonProfile name="Kaden Primorac" jobTitle="Research Lead" imageSrc={kadenImage} />
              <HexagonProfile name="Kaden Primorac" jobTitle="Outreach Coordinator" imageSrc={kadenImage} />
            </div>
            
            {/* Fifth row - 2 profiles */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Kaden Primorac" jobTitle="Technical Lead" imageSrc={kadenImage} />
              <HexagonProfile name="Kaden Primorac" jobTitle="Student Representative" imageSrc={kadenImage} />
            </div>
          </div>
        </div>
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginTop: "30px",
        }}>
         <h1 style={{
          fontFamily: "Anton",
          color: "#226897",
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "center",
          margin: "0"
         }}>Get in Touch</h1>
                   <a 
            href="mailto:bioinnovate@gmail.com"
            style={{
              fontFamily: "Quicksand",
              fontSize: "18px",
              color: "#226897",
              textDecoration: "none",
              marginTop: "10px",
              padding: "10px 20px",
              border: "2px solid #226897",
              borderRadius: "25px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#226897";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#226897";
            }}
          >
            bioinnovate@gmail.com
          </a>
        </div>
      </div>
    </>
  );
} 