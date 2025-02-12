import { headers } from "next/headers";

export default async function ApiFromServer() {
  const res = await fetch("http://localhost:3000/api/protected", {
    method: "GET",
    headers: headers(),
  }).then((res) => res.json());

  return (
    <div>
      <div>
        API route from <span>Server</span>
      </div>
      <div>Name: {res?.name}</div>
    </div>
  );
}
