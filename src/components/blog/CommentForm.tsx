import { useState, useEffect } from "react";
import { useCookies } from "react-cookie";

interface Props {
  selected: ArticleComment | null;
  setSelected: Function;
  submitComment: Function;
  sending: boolean;
}

export default function CommentForm(props: Props) {
  const [author, setAuthor] = useState("");
  const [mail, setMail] = useState("");
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [receiveMail, setReceiveMail] = useState(true);
  const [firstComment, setFirstComment] = useState(true);

  const [cookies, setCookie, removeCookie] = useCookies([
    "author",
    "mail",
    "url",
  ]);

  useEffect(() => {
    cookies.author && (setAuthor(cookies.author), setFirstComment(false));
    cookies.mail && setMail(cookies.mail);
    cookies.url && setUrl(cookies.url);
  }, []);

  return (
    <>
      {props.selected !== null && (
        <div className="mt-4 flex justify-between">
          <p className="primary-color font-bold">
            <i className="ri-reply-line"></i> 回复 @{props.selected.author}{" "}
            的评论：
          </p>
          <p>
            <span
              className="link"
              onClick={() => {
                props.setSelected(null);
              }}
            >
              取消回复
            </span>
          </p>
        </div>
      )}
      <p className="mt-4 primary-color card p-2">
        <i className="ri-information-line"></i>{" "}
        <b>所有评论都将经过博主审核。</b>
        请勿填写无意义邮箱或发表无关评论、广告等，否则会被视为垃圾评论。
        <br />
        评论提交组件是最近刚写的，如果遇到 bug 欢迎向博主反馈～
      </p>
      <form
        onSubmit={(e) => {
          props.submitComment(author, mail, url, text, receiveMail);
          setText("");
          e.preventDefault();
        }}
        className="mt-4 grid gap-4 grid-cols-1 sm:grid-cols-3 relative"
      >
        {/* <div className="absolute -top-2 -left-2 -bottom-2 -right-2 backdrop-blur-sm z-10 rounded-xl flex justify-center items-center">
          <p className="primary-color">评论已提交，等待审核中。</p>
        </div> */}
        <input
          placeholder="你的名字"
          type="text"
          required={true}
          value={author}
          onChange={(e) => {
            setAuthor((e.target as HTMLInputElement).value);
          }}
        />
        <input
          placeholder="邮箱"
          type="email"
          required={true}
          value={mail}
          onChange={(e) => {
            setMail((e.target as HTMLInputElement).value);
          }}
        />
        <input
          placeholder="网址"
          type="url"
          value={url}
          onChange={(e) => {
            setUrl((e.target as HTMLInputElement).value);
          }}
        />
        <textarea
          rows={8}
          className="sm:col-span-3"
          placeholder="说点什么吧……"
          required={true}
          value={text}
          onChange={(e) => {
            setText((e.target as HTMLTextAreaElement).value);
          }}
        ></textarea>
        <button
          type="submit"
          className="sm:col-span-3"
          disabled={props.sending}
        >
          {props.sending ? "提交中……" : "提交"}
        </button>
        {/* 这个组件太丑了，改天美化一下 */}
        {/* <div className="sm:col-span-3 flex items-center">
          <input
            type="checkbox"
            id="receiveMail"
            name="receiveMail"
            checked={receiveMail}
            onChange={(e) => {
              setReceiveMail((e.target as HTMLInputElement).checked);
            }}
          />
          <label htmlFor="receiveMail" className="secondary-color ml-2">
            当有人回复我时，接收邮件通知
          </label>
        </div> */}
      </form>
      {firstComment && (
        <p className="mt-4 secondary-color text-sm leading-normal">
          提交评论即表明你同意本网站使用
          Cookie，并允许本站在后台记录你的邮箱、IP 地址等必要信息。
          <br />
          （提交一次评论后，本提示将不再展示）
        </p>
      )}
    </>
  );
}
