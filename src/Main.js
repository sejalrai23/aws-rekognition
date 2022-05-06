import React, { useState, useEffect } from 'react';
import "./main.css";
import { IoMdCloudUpload } from "react-icons/io";
import axios from 'axios';


const Main = () => {
  const [image, setImage] = useState();
  const [file, setFile] = useState(false);
  const [data, setData] = useState();
  const[data1,setData1]=useState();
  const [preview, setPreview] = useState();
  const [text, setText]=useState();
  const [isLoading, setIsloading] = useState(false);
  const [isLoading1, setIsloading1]=useState(false);

  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }
    const objectUrl = URL.createObjectURL(image);
    setPreview(objectUrl);
  }, [image]);

  useEffect(() => {
    if (!preview) {
      return;
    }
    // setIsloading(true);
    // sendfile();
  }, [preview]);

  const fileHandler = (e) => {
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
    setFile(true);
  }



  const sendfile = async () => {
    let formData = new FormData();
    formData.append("file", image);
    let res = await axios({
      headers: { 'Access-Control-Allow-Origin': '*' },
      method: "post",
      url: 'http://localhost:8000/predict',
      data: formData,
      crossorigin: true
    });
    if (res.status === 200) {
      console.log(res.data);
      setData(res.data);
    }
    setIsloading(true);
  }

  const sendText=async()=>{
    let formData=new FormData();
    formData.append("text",text);
    console.log(text);
    document.getElementById("inputx").value = "";
    let res = await axios({
      headers: { 'Access-Control-Allow-Origin': '*' },
      method: "post",
      url: 'http://localhost:8000/gettext',
      data: formData,
      crossorigin: true
    });
    if (res.status === 200) {
      console.log(res.data);
      setData1(res.data);
    }
    
    setIsloading1(true);
  }
  return (
    <>
      <div>
        <div className="navbar">
          <h3 className="nav-text">CELEBRITY DETECTION</h3>
        </div>
        <div className="background-image"></div>
        <div className="box">
          <p className="text"> Upload a picture of celebrity</p>
          {file && <div className="upload-1">
            <img src={preview} alt="img" />
          </div>
          }
          {file ? "" : <div className="upload">
            <button className="btn-upload"><IoMdCloudUpload className="icon" size={25} />Choose file</button>
            <input type="file" onChange={(e) => fileHandler(e)} />
          </div>}
         
          <div className="btn-class2">
            {
              isLoading ? <div className="res-text"><h3>Type-{data.prediction}</h3></div> : <button className="btn-send" onClick={sendfile}>send</button>
            }

          </div>
        

          {/* <div className='textbox'>
          <div>
            <input className='inputField' id="inputx" type="text"value={text} onChange={(e)=>setText(e.target.value)}/>
          </div>
        </div>
         
        <div className="btn-class">
            {
              isLoading1 ? <div className="res-text"><h3>Type-{data1.prediction}</h3></div> : <button className="btn-send" onClick={sendText}>send</button>
            }

          </div> */}
        </div>
       
      </div>
    </>

  );
}

export default Main;