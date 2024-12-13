import React, { useState, useEffect } from 'react';
import styles from './Home.module.css'
import Header from '../Header/Header'
import home_logo from '../../assets/logo2.svg'
import search_icon from '../../assets/search-icon.png'
import download_icon from '../../assets/download_icon.png'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Home() {
  const [userEmail, setUserEmail] = useState("");

  //Reuse in other pages that requires logging in
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios
      .get("http://localhost:8080")
      .then((res) => {
        if (res.data.valid) {
          setUserEmail(res.data.email);
        } else {
          navigate("/registerlogin");
        }
      })
      .catch((err) => {
        console.error("Error validating user session:", err);
      });
  }, []);
  //Reuse in other pages that requires logging in

  return (
    <div className={styles.container}>
      <div className={styles.header_container}>
        <Header />
      </div>
      <div className={styles.content}>
        <div className={styles.main_content}>
        <div className={styles.logo_container}>
          <img src={home_logo} className={styles.logo} alt="This is the logo" />
        </div>
        <div className={styles.content_search_bar_container}>
            <input type="text"
              className={styles.content_search_bar}
              placeholder='Search'            
            />
            <button className={styles.search_button}>
              <img src={search_icon} className={styles.search_icon} alt="This is a search icon" />
            </button>
        </div>  
        <div className={styles.action_buttons_container}>
          <button className={styles.action_button}>
            create document
          </button>
          <button className={styles.action_button}>
            create presentation
          </button>
          <button className={styles.action_button}>
            upload content
          </button>
        </div>
        </div>
      </div>
      <div className={styles.downloaded_contents_button_container}>
          <button className={styles.download_contents_button}>
            <img src={download_icon} className={styles.download_contents_icon} alt="This is the download icon" />
            view downloaded contents
          </button>
        </div>
    </div>
  )
}

export default Home