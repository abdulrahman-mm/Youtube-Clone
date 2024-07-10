import React, { useEffect, useState } from "react";
import "./Feed.css";

import { Link } from "react-router-dom";
import { apiKey } from '../../ApiKey'
import moment from "moment";

function Feed({ category }) {
  const [dataFromApi, setDataFromApi] = useState([]);

  const fetchdata = async () => {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=IN&videoCategoryId=${category}&key=${apiKey}`

    await fetch(url)
      .then((res) => res.json())
      .then((data) => setDataFromApi(data.items))
      .catch(err=>console.error(err))
  };

  useEffect(() => {
    fetchdata();
    console.log(dataFromApi);
  }, [category]);

  function videoViewsConvert(value){

    if(value>=1000000){
     return Math.floor(value/1000000)+"M"
    }

    if(value>=1000){
      return Math.floor(value/1000)+"K"
    }

    else{
      return value
    }

  }


  console.log(dataFromApi);
  return (
    <div className="feed">
      {dataFromApi.map((item,index) => {
        return (
          <Link to={`video/${item.snippet.categoryId}/${item.id}`} className="card">
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>
            <p>{videoViewsConvert( item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow() }</p>
          </Link>
        );
      })}
    </div>
  );
}

export default Feed;
