import axios from "../../util/axios";

export const getContests = async () => {
  const { data } = await axios.get("/contests/");
  return data;
};

export async function updateContest(contestId, contest) {
  const { data } = await axios.put(`/contests/${contestId}/`, contest);
  return data;
}
