import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export default function Dashboard() {
  let token;
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);
  const [message, setMessage] = useState({
    msg: "",
    token: token,
  });
  useEffect(() => {
    token = localStorage.getItem("accessToken");
    let mounted = true;
    if (mounted) {
      const getProf = async () => {
        const test = await axios.get(
          "https://dev-be.trijagabaya.co.id/api/auth/user-profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserDetail(test.data?.data[0]);
      };
      const act = async () => {
        const test = await axios.post(
          "https://dev-be.trijagabaya.co.id/api/satpam-kegiatan/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(test.data?.status);
        setMessage({ msg: test.data?.status, token: token });
      };
      act();
      getProf();
    }
    if (!token) {
      navigate("/");
    }
    return () => {
      mounted = false;
    };
  }, [token]);

  return (
    <div className="w-full h-screen bg-gray-300 flex flex-col items-center justify-start">
      <div className="w-3/4 h-max p-3 bg-white rounded shadow flex flex-col items-center mt-10 space-y-3">
        <h1 className="text-2xl font-semibold">Personal Information</h1>
        <div>
          <img
            src={userDetail?.adminpetugasfoto}
            alt={userDetail?.adminpetugasnamalengkap}
            className="w-20 h-20 rounded-full border shadow"
          />
        </div>
        <h1 className="text-lg font-semibold text-center">
          {userDetail?.adminpetugasnamalengkap}{" "}
          <span className="bg-green-300 m-1 text-xs p-1 rounded">
            {userDetail?.adminpetugasjabatan}
          </span>
        </h1>
        <h1 className="text-2xl font-semibold">Company Information</h1>
        <div>
          <img
            src={userDetail?.adminpetugasperusahaanfoto}
            alt={userDetail?.adminpetugasnamalengkap}
            className="w-20 h-20 rounded-full border shadow"
          />
        </div>
        <h1 className="text-lg font-semibold text-center">
          {userDetail?.adminpetugasperusahaannama}
          <span className="bg-green-300 text-xs p-1 rounded">
            {userDetail?.adminpetugasperusahaankode}
          </span>
        </h1>
      </div>
      <h1 className="text-2xl font-semibold">{message.msg}</h1>
      <div className="w-[300px] overflow-x-scroll h-auto bg-white">
        <h1 className="text-xs max-w-10 font-semibold whitespace-normal">
          {message.token}
        </h1>
      </div>
    </div>
  );
}
