import React from 'react';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../node_modules/font-awesome/css/font-awesome.min.css'; 
import './Search.css';
import {default as axios} from 'axios';

const apiUrl = "https://intstabotapi.vercel.app/getHashtags";

const Search = () => {
    const [hashtags, setState] = useState("#amazing #art #beach #beautiful #beauty #cute #dog #family #fashion #fitness #follow #follow4follow #followforfollow #followme #food #foodporn #friends #fun #girl #happy #igers #instadaily #instagood #instagram #instalike #instamood #life #like4like #likeforlike #likes #love #makeup #me #model #motivation #music #nature #nofilter #ootd #photo #photography #photooftheday #picoftheday #repost #selfie #smile #style #summer454.2M #sunset #tbt #travel #likes #like #follow #likeforlikes #love #instagood #instagram #followforfollowback #followme #photooftheday #photography #bhfyp #instalike #l #instadaily #likeforfollow #picoftheday #fashion #beautiful #me #followers #smile #likeforlike #myself #followback #f #comment #followforfollow #likesforlikes #art")  
      
    return (
        <section className='container-lg justify-content-center'>
            <div className='py-4 container-lg  row justify-content-center'> 
                <div className='sdiv my-3'>            
                    <input type="search" id="searchBar" autoComplete="on" className="form-control rounded" placeholder="Search top hashtags" onKeyPress={(e) => {
                        if (e.key === "Enter") {
                            document.getElementById("searchButton").click();
                        }
                    }}/>
                </div>
                <div className="col-1 my-3 hidden-mobile">
                    <button type="button" className="btn btn-dark mx-1 " id="searchButton" onClick={()=>{
                        const searchHashtag = document.getElementById("searchBar").value;
                        if(searchHashtag.length>0)
                        {
                            const hashtagP = document.getElementById("allHashtags");
                            setState("Loading...");
                            hashtagP.style.fontSize = "3rem";
                            let hashSearch = "?hashtag=" + searchHashtag;
                            axios.get(apiUrl+hashSearch)
                            .then(response => {
                                let hashtagsData = response.data.substring(0,response.data.lastIndexOf(" "));
                                hashtagP.style.display = "block";
                                hashtagP.style.fontSize = "1rem";
                                setState(hashtagsData);
                            })
                        }
                        else{
                            setState("#git #github #frontend #reactjs #javascript #coding #programming #khattakdev #crash #course #development #web #technologies #typescript #chrome #dev #python #html #programmer #developer #code #coder #php #software #computerscience #webdeveloper #webdevelopment #softwaredeveloper #codinglife #technology #linux #webdesign #android #thesmartcoders #programmingmemes #tech #programmers #c #softwareengineer #computer #java #pythonhub #python3 #pythonprogramming #ai #ml #artificialintelligence #machinelearning #pythonquiz #react #developers #learncoding #webdev #coders #programmingstudents #programmers #htmlcss #100daysofcode #javascriptdeveloper #learnjavascript #csstricks #nodejs")
                        }
                    }}>
                        <i className="fa px-1 fa-search fax-5"></i>
                    </button>
                </div>

                <div className="col-1 my-3">
                    <button type="button" className="btn btn-dark mx-1" id="copyButton" onClick={()=>{
                            navigator.clipboard.writeText(hashtags);
                    }}>
                        <i className="fa fa-clone fax-4"></i>
                    </button>
                </div>                
            </div>

            <div className="row d-flex justify-content-center">
                <div className="bg-light displayArea col-10 my-4 p-1" id="displayArea">
                    <p className='p' id="allHashtags">{hashtags}</p>
                </div>
            </div>
        </section>
    )
}


export default Search;