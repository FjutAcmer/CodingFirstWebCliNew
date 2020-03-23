/**
 * 命名规则：
 * path： 均为小写，不同单词间以“-”分隔，按照路径命名无需对应
 * name: 除首个单词外，其他单词的首字母大写，且需与component命名对应
 * component: 即文件名，每个单词的首字母大写，且需与name命名对应
 */
const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "",
        name: "index",
        component: () => import("pages/Index.vue"),
        meta: {
          title: "主页"
        }
      },
      {
        path: "problem-list",
        name: "problemList",
        component: () => import("layouts/ProblemListLayout.vue"),
        meta: {
          title: "题库"
        },
        children: [
          {
            path: "/",
            name: "localProblem",
            component: () => import("pages/problem-list/LocalProblem.vue"),
            meta: {
              title: "本地题库"
            }
          },
          {
            path: "vj",
            name: "VJProblem",
            component: () => import("pages/problem-list/VJProblem.vue"),
            meta: {
              title: "Virtual Judge题库"
            }
          }
        ]
      },
      {
        path: "submit",
        name: "localSubmit",
        component: () => import("pages/submit/LocalSubmit.vue"),
        meta: {
          title: "本地题目"
        }
      },
      {
        path: "submit/vj",
        name: "VJSubmit",
        component: () => import("pages/submit/VJSubmit.vue"),
        meta: {
          title: "VJ题目"
        }
      },
      {
        path: "status",
        name: "status",
        component: () => import("layouts/StatusLayout.vue"),
        meta: {
          title: "评测"
        },
        children: [
          {
            path: "/",
            name: "localStatus",
            component: () => import("pages/status/LocalStatus.vue"),
            meta: {
              title: "本地评测"
            }
          },
          {
            path: "vj",
            name: "VJStatus",
            component: () => import("pages/status/VJStatus.vue"),
            meta: {
              title: "Virtual Judge评测"
            }
          }
        ]
      },
      {
        path: "result",
        name: "localResult",
        component: () => import("pages/result/LocalResult.vue"),
        meta: {
          title: "评测详情"
        }
      },
      {
        path: "result/vj",
        name: "VJResult",
        component: () => import("pages/result/VJResult.vue"),
        meta: {
          title: "评测详情"
        }
      },
      {
        path: "user/login",
        name: "login",
        component: () => import("pages/user/Login.vue"),
        meta: {
          title: "登录"
        }
      },
      {
        path: "user/register",
        name: "register",
        component: () => import("pages/user/Register.vue"),
        meta: {
          title: "注册"
        }
      },
      {
        path: "user/message",
        name: "message",
        component: () => import("pages/message/Message.vue"),
        meta: {
          title: "站内消息"
        }
      },
      {
        path: "user/check-in",
        name: "checkIn",
        component: () => import("pages/user/CheckIn.vue"),
        meta: {
          title: "签到记录"
        }
      },
      {
        path: "project-introduction",
        name: "projectIntroduction",
        component: () => import("pages/ProjectIntroduction.vue"),
        meta: {
          title: "项目简介"
        }
      },
      {
        path: "develop-log",
        name: "devLog",
        component: () => import("pages/DevLog.vue"),
        meta: {
          title: "开发日志"
        }
      },
      {
        path: "develop-team",
        name: "devTeam",
        component: () => import("pages/DevTeam.vue"),
        meta: {
          title: "开发团队"
        }
      },
      {
        path: "*",
        component: () => import("pages/Error404.vue"),
        meta: {
          title: "页面不存在"
        }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
