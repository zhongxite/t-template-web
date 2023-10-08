import { ElNotification } from "element-plus";
import { init } from "@/common/init";
let { isShowLoadingBox } = storeToRefs(init());
export const exportXlsxFile = (res, fileName) => {
  let time = new Date().getTime();
  let blobUrl = window.URL.createObjectURL(
    new Blob([res.data], {
      type: "application/vnd.ms-excel",
    })
  );
  const link = document.createElement("a");
  link.style.display = "none";
  link.download = fileName + time + ".xlsx";
  link.href = blobUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  isShowLoadingBox.value = false;
  ElNotification({
    message: "导出成功",
    type: "success",
  });
};

export const convertTime = (timestamp) => {
  timestamp = timestamp ? timestamp : null;
  let date = new Date(timestamp); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + "-";
  let M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  let D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  let h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  let m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  let s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  return `${Y}${M}${D} ${h}${m}${s}`;
};