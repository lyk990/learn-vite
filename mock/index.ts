import mockJS from "mockjs";
const userList = mockJS.mock({
  "data|100": [
    {
      name: "@cname",
      "id|+1": 1,
    },
  ],
});
export default [
  {
    method: "post",
    url: "/api/users",
    response: ({ body }) => {
      return {
        code: 200,
        msg: "success",
        data: userList,
      };
    },
  },
];
