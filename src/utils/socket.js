import { io } from "socket.io-client";
import {
  setAnswer,
  setFlag,
  setRole,
  setOffer,
  setUsers,
} from "../store/media";
import { peerConnection, setStream } from "./media";

export let socket = null;
/**
 * 1. c ---> signal server 发现没有房间，创建房间 --> 通知 c1 你是 发起者；若发现有房间，则通知 c 你是加入者，并发送 offer
 * 2. c ---> c是发起者，向 signal server 发送 offer --> signal server 查看房间是否有人，有人则转发 offer，否则存储 offer
 * 3. c ---> c是加入者，向 signal server 发送 answer --> signal server 查看房间是否有人，有人则转发 answer，否则丢弃 answer，并返回 --> 告知失败
 */

export const initSocket = (url, { token }, dispatch) => {
  if (socket) return socket;
  socket = io(url, {
    auth: {
      roomId: token,
    },
  });

  socket.on("connect", handleConnected);
  socket.on("disconnect", handleDisconnected);
  socket.on("error", handleError);
  socket.on("waiting", handleWaiting);
  socket.on("negotiation::start", () => {
    console.log("[negotiation::start] set role to 'initiator'");
    dispatch(setRole("initiator"));
  });
  socket.on("offer", (offer) => {
    dispatch(setOffer(offer));
    dispatch(setRole("participant"));
  });
  socket.on("answer", (answer) => {
    dispatch(setAnswer(answer));
  });
  socket.on("candidate", (candidate) => {
    peerConnection.addIceCandidate(candidate);
    console.log("[socket.js] 接收对方的 candidate ---> ", candidate);
  });
  socket.on("users", (users) => {
    console.log("[socket.js] users", users);
    dispatch(setUsers(users));
  });
  socket.on("user::leave", (socketId) => {
    console.log("A user left", socketId);
    dispatch(setUsers([]));
    dispatch(setRole(""));
    dispatch(setOffer(null));
    dispatch(setAnswer(null));
    dispatch(setFlag({ key: "remoteStream", value: false }));
    setStream("remote", new MediaStream());
  });
  socket.on("close-communication", () => {
    dispatch(setUsers([]));
    dispatch(setRole(""));
    dispatch(setOffer(null));
    dispatch(setAnswer(null));
    dispatch(setFlag({ key: "remoteStream", value: false }));
    setStream("remote", new MediaStream());
    window.history.back(0);
  });
  dispatch(setFlag({ key: "socket", value: true }));
};

function handleConnected() {
  console.log("connected");
}

function handleDisconnected() {
  console.log("disconnect");
}

function handleError(error) {
  console.error("Error", error);
}

function handleWaiting() {
  console.log("waiting for participant(s)");
}
