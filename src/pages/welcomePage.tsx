import React, { CSSProperties,useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Tbutton from "../components/todoButton";

const WelcomePage = () => {
    const navigate = useNavigate();

    const [isButtonClicked, setIsButtonClicked] = useState(false)
    const [leftSideWidth, setLeftSideWidth] = useState("50%");
    const [rightSideWidth, setRightSideWidth] = useState("50%");
    const [borderRadius, setBorderRadius] = useState("30px");


    useEffect(() => {
      if (isButtonClicked) {
        setBorderRadius("0px");
        const timeout = setTimeout(() => {
          navigate("/todo");
        }, 2000);
        return () => clearTimeout(timeout);
      }
    }, [isButtonClicked]);

    const leftStyle: CSSProperties = {
      width: leftSideWidth,
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgb(157, 214, 254)",
      borderTopRightRadius: borderRadius,
      borderBottomRightRadius: borderRadius,
      transition: "all 2s ease",
    };
    const rightStyle: CSSProperties = {
        width: rightSideWidth,
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        transition: "all 2s ease",
    };

    // const handleStart = () => {
    //     navigate("/todo");
    // };

    return (
        <div style={styles.container}>
            <div style={leftStyle}>
                ToDoList 그림
            </div>
            <div style={rightStyle}>
                <div style={{marginTop: "40px", marginBottom: "60px", height: "calc(100%-100px)", display: leftSideWidth === "50%" ? "flex" : "none", flexDirection: "column", alignItems: 'center'}}>
                    <h1 style={styles.title}>✨ 아뮤즈 할 일 목록</h1>
                    <p style={styles.description}>
                        나만의 할 일 리스트를 쉽게 추가하고, 관리해보세요.
                    </p>
                    {/* <button onClick={()=>{
                        setLeftSideWidth("100%");
                        setRightSideWidth("0%");
                        setIsButtonClicked(true);
                    }} style={styles.button}>
                        시작하기
                    </button> */}
                    <Tbutton
                      text="시작하기기"
                      onButtonClick={
                        ()=>{
                          setLeftSideWidth("100%");
                          setRightSideWidth("0%");
                          setIsButtonClicked(true);
                        }
                      }
                    >

                    </Tbutton>
                </div>                
            </div>
        
        </div>
    );
};

const styles: { [key: string]: CSSProperties } = {
  container: {
    height: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",   
    background: "linear-gradient(to right, #e3f2fd, #ffffff)",
  },
//   left: {
//     width: leftSideWidth,
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor:'rgb(157, 214, 254)',
//     borderTopRightRadius: leftSideWidth==="50%"?"30px":"0", 
//     borderBottomRightRadius: leftSideWidth==="50%"?"30px":"0",
//     transform: '2s'
//   },
//   right: {
//     width: '50vw',
//     height: "100vh",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     background: "linear-gradient(to right, #e3f2fd, #ffffff)",
//   },
  title: {
    fontSize: "32px",
    marginTop: "12px",
    marginBottom: "12px",
    fontWeight: "bold",
    color: "#0d47a1",
  },
  description: {
    fontSize: "16px",
    marginBottom: "24px",
    color: "#555",
    textAlign: "center",
    maxWidth: "400px",
  },
  // button: {
  //   marginTop: "12px",
  //   marginBottom: "12px",
  //   width: '70%',
  //   padding: "14px 32px",
  //   fontSize: "16px",
  //   backgroundColor: "#1976d2",
  //   color: "#fff",
  //   border: "none",
  //   borderRadius: "12px",
  //   cursor: "pointer",
  //   transition: "background-color 0.3s",
  // },
};

export default WelcomePage;