const cache = {};

const request = async (url) => {
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      throw errorData;
    }
  } catch (e) {
    throw {
      message: e.message,
      status: e.status,
    };
  }
};

export const api = {
  fetchLanguages: async (keyword) => {
    if (cache[keyword]) {
      return {
        isError: false,
        data: cache[keyword],
      };
    }
    try {
      const data = await request(
        `${process.env.BASE_URL}/languages?keyword=${keyword}`
      );
      cache[keyword] = data;
      return {
        isError: false,
        data,
      };
    } catch (e) {
      return {
        isError: true,
        data: e,
      };
    }
  },
};
