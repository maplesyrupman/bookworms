import React from 'react';

const Footer = () => {
    return (
        <footer className="w-100 mt-auto bg-purple-900 text-.5xl w-full text-slate-300 p-2">
            <div className="footer">
                <div>&copy; 2022 by BookWorms </div>

                <div style={{ display: "inline-block", fontSize: "20px" }}> <h4>Credits</h4>

                    <div style={{ display: "flex" }}>
                        <p style={{ marginRight: "10px", fontSize: "12px" }}>
                            William Weiland </p>
                        <a href="https://github.com/maplesyrupman" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }} >
                            <img src={require("../logo/github.png")} alt="Github" className="logo"></img>
                        </a>

                        <a href="mailto://csvarshajain@gmail.com" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }}>
                            <img src={require("../logo/gmail.png")} alt="gmail" className="logo"></img>
                        </a>
                    </div>

                    <div style={{ display: "flex" }}>
                        <p style={{ marginRight: "10px", fontSize: "12px" }}>Varsha Jain </p>
                        <a href="https://github.com/vjain83" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }} >
                            <img src={require("../logo/github.png")} alt="Github" className="logo"></img>
                        </a>

                        <a href="mailto://csvarshajain@gmail.com" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }}>
                            <img src={require("../logo/gmail.png")} alt="gmail" className="logo"></img>
                        </a>
                    </div>

                    <div style={{ display: "flex" }}>
                        <p style={{ marginRight: "10px", fontSize: "12px" }}>Rhoda Evangelene</p>
                        <a href="https://github.com/rhodaevangelene" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }} >
                            <img src={require("../logo/github.png")} alt="Github" className="logo"></img>
                        </a>

                        <a href="mailto://rhoda.evangelene@gmail.com" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }}>
                            <img src={require("../logo/gmail.png")} alt="gmail" className="logo"></img>
                        </a>
                    </div>

                    <div style={{ display: "flex" }}>
                        <p style={{ marginRight: "10px", fontSize: "12px" }}>Daniel Subramanian</p>
                        <a href="https://github.com/dan13l80" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }} >
                            <img src={require("../logo/github.png")} alt="Github" className="logo"></img>
                        </a>

                        <a href="mailto://daniel.rufus@gmail.com" target="_blank" rel="noopener noreferrer"
                            style={{ marginRight: "10px", height: "20px", width: "20px" }}>
                            <img src={require("../logo/gmail.png")} alt="gmail" className="logo"></img>
                        </a>
                    </div>
                </div>
            </div>

        </footer >
    );
};

export default Footer;