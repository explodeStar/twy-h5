import React, { Suspense } from "react";
import styles from "./index.module.scss";
import Icon from "@/components/Icon";
import classNames from "classnames";
import { useLocation, useNavigate, Routes, Route } from "react-router-dom";

const Home = React.lazy(() => import("../Home"));
const QA = React.lazy(() => import("../QA"));
const Video = React.lazy(() => import("../Video"));
const Profile = React.lazy(() => import("../Profile"));

const tabbar = [
  {
    title: "首页",
    icon: "icon-home",
    path: "/home",
  },
  {
    title: "问答",
    icon: "icon-wenda",
    path: "/home/qa",
  },
  {
    title: "视频",
    icon: "icon-shipin",
    path: "/home/video",
  },
  {
    title: "我的",
    icon: "icon-Owner",
    path: "/home/profile",
  },
];

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className={styles.root}>
      <div className="tab-content">
        {/* 二级路由 */}
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="" element={<Home />} />
            <Route path="qa" element={<QA />} />
            <Route path="video" element={<Video />} />
            <Route path="profile" element={<Profile />} />
          </Routes>
        </Suspense>
      </div>
      <div className="tabbar">
        {tabbar.map((item) => (
          <div
            className={classNames(
              "tabbar-item",
              item.path === location.pathname && "tabbar-item-active",
            )}
            key={item.path}
            onClick={() => navigate(item.path) }
          >
            <Icon type={item.icon} />
            <span>{item.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
