import {
    postUrls,
  } from './Network';
  
  export async function createNewPost(params) {
    const url = postUrls(params).create;
    console.log('create post url', url,params)
      try {
          const response = await fetch(url, {
              method : 'POST',
              headers : {
                'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
                'Content-Type': 'application/json',
              },
              body : JSON.stringify(params)
            });
          const json = await response.json();
          console.log('create post response', json)
          return json;
      } catch (error) {
          return error;
      }
  }
  
  export async function getMyPosts(params) {    
    console.log('post get rl', params);
    const url = postUrls(params).list;
    try {
        const response = await fetch(url);
        const json = await response.json();
        console.log('ger post response', json)
        return json;
    } catch (error) {
        return error;
    }
  }

// export async function userLoginUtils(params) {
//   const url = userUrls(params).login;
//   console.log('user post prams', url,params)
//     try {
//         const response = await fetch(url, {
//             method : 'POST',
//             headers : {
//               'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//               'Content-Type': 'application/json',
//             },
//             body : JSON.stringify(params)
//           });
//         const json = await response.json();
//         console.log('user login response', json)
//         return json;
//     } catch (error) {
//         return error;
//     }
// }
