import {
    postUrls, userUrls, friendUrls
  } from './Network';
  
//   export async function createNewPost(params: any): Promise<any> {
//     const url = postUrls(params).create;
//       try {
//           const response = await fetch(url, {
//               method : 'POST',
//               headers : {
//                 'Accept': 'application/json, application/xml, text/plain, text/html, *.*',
//                 'Content-Type': 'application/json',
//               },
//               body : JSON.stringify(params)
//             });
//           const json = await response.json();
//           return json;
//       } catch (error) {
//           return error;
//       }
//   }
  
  export async function getUsersList(params: any): Promise<any> {    
      const url = userUrls(1).create;
    try {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    } catch (error) {
        return error;
    }
  }

  export async function getMyFrndsList(params: any): Promise<any> {    
    const url = friendUrls(params).list;
  try {
      const response = await fetch(url);
      const json = await response.json();
      return json;
  } catch (error) {
      return error;
  }
}

  export async function findIsmyFrnd(params: any): Promise<any> {    
    const url = friendUrls(1).find;
    console.log('findIsmyFrnd post',url,params)
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
        console.log('findIsmyFrnd//// return',json)
        return json;
    } catch (error) {
        return error;
    }
}


export async function setAddFrndUtils(params: any): Promise<any> {
  const url = friendUrls(params).addfrnd;
  console.log('setAddFrndUtils prams', url,params)
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
        console.log('setAddFrndUtils response', json)
        return json;
    } catch (error) {
        return error;
    }
}

export async function setUnFrndUtils(params: any): Promise<any> {
  const url = friendUrls(params).removefrnd;
  console.log('setUnFrndUtils prams', url,params)
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
        console.log('setUnFrndUtils response', json)
        return json;
    } catch (error) {
        return error;
    }
}


