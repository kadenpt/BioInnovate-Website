import React from 'react';
import HexagonProfile from './HexagonProfile';

import tomImage from '../../assets/tom.jpg';
import kadenImage from '../../assets/placeholder.png';
import taraImage from '../../assets/tara.jpg';
import brynImage from '../../assets/bryn.jpg';
import camImage from '../../assets/cam.jpg';
import ethanImage from '../../assets/ethan.jpg';

import homeBackground from '../../assets/homeBackground.JPG';
import tempBackground from '../../assets/tempBackground.png';

export default function AboutUs() {
  return (
    <div style={{
      position: "relative",
      minHeight: "100vh",
      width: "100%"
    }}>
      {/* Base Background Layer - homeBackground.JPG */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${homeBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -2
      }} />
      
      {/* Overlay Layer - tempBackground.png */}
      <div style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${tempBackground})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        zIndex: -1,
        opacity: 0.7
      }} />
      
      {/* Original Content - Unchanged */}
      <div style={{
        position: "relative",
        zIndex: 1,
        marginTop: "100px",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        paddingLeft: "20px",
        paddingRight: "20px",
        width: "100%"
      }}>
        <h1 style={{ 
          alignSelf: "flex-start",
          fontFamily: "Anton",
          color: "#68adc4",
          fontSize: "40px",
          fontWeight: "bold",
          textAlign: "left",
          margin: "0"
        }}>WHO ARE WE</h1>
        <p style={{
          fontFamily: "roboto, sans-serif",
          fontSize: "18px",
          color: "#1a4a6b",
          lineHeight: "1.8",
          fontWeight: "500",
          maxWidth: "800px",
          textAlign: "left",
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          padding: "2rem",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          alignSelf: "flex-start"
        }}>
          BioInnovate UBC is a dynamic student-led organization dedicated to bridging the gap between academia and industry, bringing together students, researchers, and industry professionals to explore and expand the boundaries of biotechnology. As a hub for innovation and collaboration, we strive to expose students to the forefront of biotech research and discovery through a variety of enriching experiences, empowering students to get involved with the next generation of biotechnology professionals. Our team is composed of passionate students from diverse faculties united by common interest for the vast potential of biotechnology.
        </p>
        <div style={{
          alignSelf: "flex-end",
          marginTop: "30px",
          textAlign: "right",
          maxWidth: "800px"
        }}>
          <h1 style={{
            fontFamily: "Anton",
            color: "#68adc4",
            fontSize: "40px",
            fontWeight: "bold",
            textAlign: "right",
            margin: "0"
          }}>OUR VISION</h1>
          <p style={{
            fontFamily: "roboto, sans-serif",
            fontSize: "18px",
            color: "#1a4a6b",
            lineHeight: "1.8",
            fontWeight: "500",
            backgroundColor: "rgba(255, 255, 255, 0.95)",
            padding: "2rem",
            borderRadius: "12px",
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)"
          }}>
            At BioInnovate UBC, we envision a future where the University of British Columbia is a pivotal hub for biotechnology innovation. We strive to continuously expand our network, bringing together students, researchers, and industry leaders to exchange knowledge and ideas that drive the Vancouver biotechnology community forward. Through our annual conference, speaker series, and dynamic community engagement, we aim to foster a culture of discovery and development that not only enhances the biotech industry but also prepares the students of UBC for influential roles in shaping tomorrow's technological landscape.
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
            color: "#68adc4",
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
              <HexagonProfile name="Ethan Skjaveland" jobTitle="Co-Founder and Advisor" imageSrc={ethanImage} />
              <HexagonProfile name="Thomas van der Sloot" jobTitle="Co-Founder and Advisor" imageSrc={tomImage} />
            </div>
            
            {/* Second row - 1 profile */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Tara Jackson" jobTitle="President" imageSrc={taraImage} />
            </div>
            
            {/* Third row - 2 profiles */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Cameron Orton" jobTitle="Chair of Engagement and Recruitment" imageSrc={camImage} />
              <HexagonProfile name="Elle Groeneveld" jobTitle="Chair of Finance" imageSrc={kadenImage} />
            </div>
            
            {/* Fourth row - 3 profiles */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Bryn Wright" jobTitle="Chair of Marketing and Communications" imageSrc={brynImage} />
              <HexagonProfile name="Sohan Sadeque" jobTitle="Chair of Marketing and Communications" imageSrc={kadenImage} />
              <HexagonProfile name="Asmita Jain" jobTitle="Chair of General Events" imageSrc={kadenImage} />
            </div>
            
            {/* Fifth row - 2 profiles */}
            <div style={{ display: "flex", gap: "40px" }}>
              <HexagonProfile name="Shirley Averbuch" jobTitle="Chair of Flagship Events" imageSrc={kadenImage} />
              <HexagonProfile name="Geoffrey Keal" jobTitle="Chair of Flagship Events" imageSrc={kadenImage} />
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
            color: "#68adc4",
            fontSize: "40px",
            fontWeight: "bold",
            textAlign: "center",
            margin: "0"
          }}>Get in Touch</h1>
          <a 
            href="mailto:bioinnovateubc@gmail.com"
            style={{
              fontFamily: "roboto",
              fontSize: "18px",
              color: "#68adc4",
              textDecoration: "none",
              marginTop: "10px",
              padding: "10px 20px",
              border: "2px solid #68adc4",
              borderRadius: "25px",
              transition: "all 0.3s ease",
              cursor: "pointer",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "#68adc4";
              e.target.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "transparent";
              e.target.style.color = "#68adc4";
            }}
          >
            bioinnovateubc@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
} 