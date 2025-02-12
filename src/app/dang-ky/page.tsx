"use client";

import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ClientSafeProvider, getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

import styles from "./Register.module.scss";
import images from "@/assets/imgs";

const cx = classNames.bind(styles);

export default function RegisterPage() {
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  const [showPass, setShowPass] = useState<boolean>(false);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [birthday, setBirthday] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.post("/api/auth", {
        name,
        birthday,
        username,
        email,
        password,
      });

      router.push("/dang-nhap");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={cx("wrapper")}>
      <div className={cx("inner")}>
        <h1>Đăng ký</h1>
        <form onSubmit={handleSubmit} className={cx("register-form")}>
          <div className={cx("input-group")}>
            <label htmlFor="name">Họ và tên</label>
            <div>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Họ và tên..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="date"
                id="birthday"
                name="birthday"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
              />
            </div>
          </div>
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
            <label htmlFor="email">Email</label>
            <div>
              <input
                type="text"
                id="email"
                name="email"
                placeholder="Nhập email..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <div className={cx("input-group")}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <div>
              <input
                type={showPass ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>
          <button className={cx("btn-register")}>Đăng ký</button>
          <p className={cx("login-prompt")}>
            <span>Đã có tài khoản!</span>
            <Link href={`/dang-nhap`} className={cx("login-link")}>
              Đăng nhập
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
