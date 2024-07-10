import React, { useEffect, useState } from "react";
import "./PlayVideo.css";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import { apiKey } from "../../ApiKey";
import moment from "moment";
import { useParams } from "react-router-dom";

function PlayVideo() {

  const{videoId}=useParams()
  const [apiData, setApiData] = useState();

  const [channelData, setChannelData] = useState();

  const [commentData, setCommentData] = useState([]);

  const[subscribe,setSubscribe]=useState(false)

  async function fetchVideoData() {
    const url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${apiKey}`;

    await fetch(url)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
  }

  async function fetchOtherData() {
    const url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${apiKey}`;

    await fetch(url)
      .then((res) => res.json())
      .then((res) => setChannelData(res.items[0]));

    const commentUrl = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${apiKey}`;

    await fetch(commentUrl)
      .then((res) => res.json())
      .then((res) => setCommentData(res.items));
  }

  useEffect(() => {
    fetchVideoData();
  }, [videoId]);

  useEffect(() => {
    fetchOtherData();
  }, [apiData]);

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
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h4>{apiData ? apiData.snippet.title : "Video Title"}</h4>
      <div className="play-video-info">
        <p>
          {apiData ? videoValueConvert(apiData.statistics.viewCount) : "1M"}{" "}
          Views &bull;
          {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? videoValueConvert(apiData.statistics.likeCount) : "500"}
          </span>

          <span>
            <img src={dislike} alt="" />
          </span>

          <span>
            <img src={share} alt="" />
            Share
          </span>

          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />

      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : " "}
          alt=""
        />

        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>
            {channelData
              ? videoValueConvert(channelData.statistics.subscriberCount)
              : "1M"}{" "}
            Subscribers
          </span>
        </div>

        <button className="subscribe-button" onClick={()=>setSubscribe(!subscribe)}>{subscribe ? 'Subscribed' : 'Subscribe' }</button>
      </div>

      <div className="vid-description">
        <p>
          {apiData ? apiData.snippet.description.slice(0, 250) : "Description"}
        </p>
        <hr />
        <h4>
          {apiData ? videoValueConvert(apiData.statistics.commentCount) : "150"}{" "}
          Comments
        </h4>

        {commentData.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName} <span>1 day ago</span>
                </h3>

                <p>
                  {item.snippet.topLevelComment.snippet.textDisplay}
                </p>

                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{videoValueConvert( item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PlayVideo;
