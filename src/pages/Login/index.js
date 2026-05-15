import React from "react";
import Icon from "@/components/Icon";
import styles from "./index.module.scss";

export default function Login() {
  return (
    <div className={styles.root}>
        {/* 顶部工具栏 */}
        <div className={styles.left}> 
            <Icon type="icon-left"  onClick={() => console.log('Daxiang clicked')} />
        </div>
        {/* 剧中标题 */}
        <div className="title">title</div>
        <div className="right">右侧内容</div>
        
      
    </div>
  );
}
