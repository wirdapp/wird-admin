import axios from "../../util/axios";

export const getContests = async () => {
  const {data} = await axios.get("/contests/");
  return data;
}