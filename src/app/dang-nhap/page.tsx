"use client";

import { useEffect, useState } from "react";
import { getProviders, signIn, ClientSafeProvider } from "next-auth/react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import styles from "./Login.module.scss";
import images from "@/assets/imgs";
import { useToast } from "@/hooks/ToastContext";

const cx = classNames.bind(styles);

export default function Login() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const route = useRouter();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };

    fetchProviders();

    document.title = "MoviSub - Đăng nhập";
  }, []);

  const handleShowPassword = () => {
    setShowPass(!showPass);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      showToast(
        "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.",
        "error",
        "top-center"
      );
    } else {
      showToast("Đăng nhập thành công!", "success", "top-center");
      route.push("/");
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h1>Đăng nhập</h1>
        <form onSubmit={handleSubmit} className={cx("login-form")}>
          <div className={cx("input-group")}>
            <label htmlFor="username">Tên đăng nhập</label>
            <div>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Username hoặc email..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>
          <div className={cx("input-group")}>
            <label htmlFor="password">Mật khẩu</label>
            <div>
              <input
                type={showPass ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {showPass ? (
                <FontAwesomeIcon
                  onClick={handleShowPassword}
                  icon={faEyeSlash}
                  className={cx("icon")}
                />
              ) : (
                <FontAwesomeIcon
                  onClick={handleShowPassword}
                  icon={faEye}
                  className={cx("icon")}
                />
              )}
            </div>
          </div>
          <div className={cx("options")}>
            <div className={cx("remember-me")}>
              <input type="checkbox" id="remember" name="remember" />
              <label htmlFor="remember">Lưu mật khẩu</label>
            </div>
            <div className={cx("forgot-password")}>
              <Link href={`#quenmatkhau`}>Quên mật khẩu</Link>
            </div>
          </div>
          <button type="submit" className={cx("btn-login")}>
            Đăng nhập
          </button>
          <p className={cx("register-prompt")}>
            <span>Không có tài khoản?</span>
            <Link href={`/dang-ky`} className={cx("register-link")}>
              Đăng ký
            </Link>
          </p>
        </form>

        <div className={cx("container-providers")}>
          {providers ? (
            Object.values(providers)
              .filter((provider) => provider.id !== "credentials")
              .map((provider) => (
                <div key={provider.name} className={cx("wrapper-providers")}>
                  <button
                    className={cx("btn-provider")}
                    onClick={() => signIn(provider.id)}
                  >
                    <Image
                      src={images[provider.id]?.src}
                      alt={images[provider.id]?.alt}
                    />
                    <p>{provider.name}</p>
                  </button>
                </div>
              ))
          ) : (
            <p>Đang tải nhà cung cấp...</p>
          )}
        </div>
      </div>
    </div>
  );
}
