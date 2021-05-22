import {
    userUrls,
  } from './Network';
  
  export async function createNewUser(params) {
    const url = userUrls(params).create;
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
          return json;
      } catch (error) {
          return error;
      }
  }
  
//   export async function getcusHotelDetails(questionParams) {    
//     const url = cusHotelDetailsUrls(questionParams).list;
//     try {
//         const response = await fetch(url);
//         const json = await response.json();
//         return json;
//     } catch (error) {
//         return error;
//     }
//   }

export async function userLoginUtils(params) {
  const url = userUrls(params).login;
  console.log('user post prams', url,params)
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
        console.log('user login response', json)
        return json;
    } catch (error) {
        return error;
    }
}
