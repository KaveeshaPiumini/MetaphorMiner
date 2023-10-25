import baseApi from "./@baseURL";


const searchResults = async (param) => {
  try {
    const res = await baseApi.get(`results?parameter=${param}`);
    return res;
  } catch (error) {
    if (error.response.status === 401 || error.response.status === 500) {
      return error.response;
    }
    console.log(error);
  }

};


export {searchResults};