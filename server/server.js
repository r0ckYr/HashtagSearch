const express = require('express'); 
const bodyParser = require('body-parser'); 
const cors = require('cors'); 
const helmet = require('helmet');
const axios = require('axios');
require('dotenv').config()


const userId = "17841451359932261";
const access_token = process.env.ACCESS_TOKEN;

const app = express(); 
app.use(helmet()); 
app.use(cors());


app.get('/getHashtags', async (req, res) => { 
    const hashtag = req.query.hashtag;
    console.log(hashtag);
    let url1 = `https://graph.facebook.com/v15.0/ig_hashtag_search?user_id=${userId}&q=${hashtag}&access_token=${access_token}`;
    await axios.get(url1)
      .then(async response => {
          let id = response.data.data[0].id;
          
          //second request
            let hashtags = [];
            let url2 = `https://graph.facebook.com/v15.0/${id}/top_media?user_id=${userId}&limit=100&fields=caption&access_token=${access_token}`;
            await axios.get(url2)
            .then( async response => {
                const data = response.data.data;
      
                for(let i=0;i<data.length;i++)
                {
                    let caption = data[i].caption;
                    try{
                        let words = caption.split(' ');
                        for(let j=0;j<words.length;j++)
                        {
                        if(words[j].startsWith("#") && (words[j].charCodeAt(1) < 256) && (words[j].charCodeAt(2) < 256))
                                hashtags.push(words[j]);
                        }
                     }
                     catch (e){}
                }
                
                // await axios.get(`https://graph.facebook.com/v15.0/${id}/recent_media?user_id=${userId}&limit=50&fields=caption&access_token=${access_token}`)
                // .then(response => {
                //     const data = response.data.data;
        
                //     for(let i=0;i<data.length;i++)
                //     {
                //         let caption = data[i].caption;
                //         let words = caption.split(' ');
                //         for(let j=0;j<words.length;j++)
                //         {
                //             if(words[j].startsWith("#") && (words[j].charCodeAt(1) < 256) && (words[j].charCodeAt(2) < 256))
                //                 hashtags.push(words[j]);
                //         }
                //     }
                // })
                // .catch(error => {
                //     console.log(error);
                //     res.send("#nothing found");
                // })

                hashtags = removeDuplicates(hashtags)
                let allHashtags = "";
                for(let i=0;i<hashtags.length;i++)
                {
                    allHashtags = allHashtags + hashtags[i].trim()+ " ";
                }
                res.send(allHashtags + hashtags.length);
            })
            .catch(error => {
                console.log(error);
                res.send("#nothing found");
            });
          


      })
      .catch(error => {
          console.log(error);
          res.send("#nothing found");
      }); 
}); 

function removeDuplicates(arr) {
    return [...new Set(arr)];
}

app.listen(5000, () => { 
    console.log('listening on port 5000'); 
}); 