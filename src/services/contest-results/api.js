export const ContestResultsApi = {
  async getResults() {
    // const res = await axios.get("/contests/results/");
    // return res.data;
    return {
      results: [
        {
          index: 0, // relative to contest start date
          date: "2024-01-01",
          submissions_count: 45,
          total_members: 50,
          top_three: [
            { id: "xxx", first_name: "Abdedwdw", last_name: "Ksds" },
            { id: "yyy", first_name: "Zem", last_name: "koop" },
            { id: "zzz", first_name: "Jnnc", last_name: "scdw" },
          ],
        },
        {
          index: 1, // relative to contest start date
          date: "2024-01-02",
          submissions_count: 50,
          total_members: 50,
          top_three: [
            { id: "xxx", first_name: "Abdedwdw", last_name: "Sd" },
            { id: "yyy", first_name: "Zemkoop", last_name: "Ssx" },
            { id: "zzz", first_name: "Jnncscdw", last_name: "Gfd" },
          ],
        },
        {
          index: 2, // relative to contest start date
          date: "2024-01-03",
          submissions_count: 35,
          total_members: 50,
          top_three: [
            { id: "xxx", first_name: "Abdedwdw", last_name: "Tvsa" },
            { id: "yyy", first_name: "Zemkoop", last_name: "Evdc" },
            { id: "zzz", first_name: "Jnncscdw", last_name: "Scwe" },
          ],
        },
        {
          index: 3,
          date: "2024-01-04",
          submissions_count: 33,
          total_members: 50,
          top_three: [
            { id: "xxx", first_name: "Abdedwdw", last_name: "Tvsa" },
            { id: "yyy", first_name: "Zemkoop", last_name: "Evdc" },
            { id: "zzz", first_name: "Jnncscdw", last_name: "Scwe" },
          ],
        },
        {
          index: 4,
          date: "2024-01-05",
          submissions_count: 19,
          total_members: 50,
          top_three: [
            { id: "xxx", first_name: "Abdedwdw", last_name: "Tvsa" },
            { id: "zzz", first_name: "Jnncscdw", last_name: "Scwe" },
          ],
        },
        {
          index: 5,
          date: "2024-01-06",
          submissions_count: 47,
          total_members: 50,
          top_three: [
            { id: "yyy", first_name: "Zemkoop", last_name: "Evdc" },
            { id: "zzz", first_name: "Jnncscdw", last_name: "Scwe" },
          ],
        },
        {
          index: 6,
          date: "2024-01-07",
          submissions_count: 40,
          total_members: 50,
          top_three: [
            { id: "xxx", first_name: "Abdedwdw", last_name: "Tvsa" },
            { id: "yyy", first_name: "Zemkoop", last_name: "Evdc" },
            { id: "zzz", first_name: "Jnncscdw", last_name: "Scwe" },
          ],
        },
        {
          index: 7,
          date: "2024-01-08",
          submissions_count: 10,
          total_members: 50,
          top_three: [{ id: "xxx", first_name: "Abdedwdw", last_name: "Tvsa" }],
        },
        {
          index: 8,
          date: "2024-01-09",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 9,
          date: "2024-01-10",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 10,
          date: "2024-01-11",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 11,
          date: "2024-01-12",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 12,
          date: "2024-01-13",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 13,
          date: "2024-01-14",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 14,
          date: "2024-01-15",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 15,
          date: "2024-01-16",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
        {
          index: 16,
          date: "2024-01-17",
          submissions_count: 0,
          total_members: 50,
          top_three: [],
        },
      ],
    };
  },
};
