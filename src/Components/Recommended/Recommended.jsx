import React, { useEffect, useState } from "react";
import "./Recommended.css";
import { apiKey } from "../../ApiKey";
import { Link } from "react-router-dom";

function Recommended({ categoryId }) {
  const [apiData, setApiData] = useState([]);

  async function fetchdata() {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=40&regionCode=IN&videoCategoryId=${categoryId}&key=${apiKey}`;

    await fetch(url)
      .then((res) => res.json())
      .then((res) => setApiData(res.items));
  }

  useEffect(() => {
    fetchdata();
  }, []);

  function videoValueConvert(value) {
    if (value >= 1000000) {
      return Math.floor(value / 1000000) + "M";
    }

    if (value >= 1000) {
      return Math.floor(value / 1000) + "K";
    } else {
      return value;
    }
  }

  return (
    <div className="recommended">
      {apiData.map((item, index) => {
        return (
          <Link
            onClick={window.scrollTo(top)}
            to={`/video/${item.snippet.categoryId}/${item.id}`}
            key={index}
            className="side-video-list"
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />

            <div className="vid-info">
              <h4>{item.snippet.title}</h4>
              <p>{item.snippet.channelTitle}</p>
              <p>{videoValueConvert(item.statistics.viewCount)} Views</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

export default Recommended;
