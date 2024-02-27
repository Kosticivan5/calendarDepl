import axios from "axios";

exports.handler = async (event, context) => {
  try {
    const response = await axios.get(
      "https://raw.githubusercontent.com/Kosticivan5/calendarDepl/main/db.json"
    );
    const data = response.data;
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data" }),
    };
  }
};
