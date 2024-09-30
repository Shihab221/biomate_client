import React, { useEffect, useState } from "react";

const PaymentCompleted = () => {
  const [paymentInfo, setPaymentInfo] = useState([]);

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      try {
        const response = await fetch("https://biomate-server-49d3.vercel.app/api/paymentinfo");
        if (response.ok) {
          const data = await response.json();
          setPaymentInfo(data);
        } else {
          console.error("Failed to fetch payment information");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPaymentInfo();
  }, []);

  return (
    <div className="px-10 py-10">
      <h2 className="text-slate-800 font-bold text-2xl mb-5">
        Payment Completed
      </h2>
      <div className="text-slate-700">
        {paymentInfo.length > 0 ? (
          <table className="min-w-full border-collapse border border-slate-400">
            <thead>
              <tr className="bg-green-500">
                <th className="border border-slate-300 px-4 py-2">Name</th>
                <th className="border border-slate-300 px-4 py-2">College</th>
                <th className="border border-slate-300 px-4 py-2">Batch</th>
                <th className="border border-slate-300 px-4 py-2">
                  Facebook ID Name
                </th>
                <th className="border border-slate-300 px-4 py-2">
                  Facebook ID Link
                </th>
                <th className="border border-slate-300 px-4 py-2">
                  Course Name
                </th>
                <th className="border border-slate-300 px-4 py-2">
                  Transaction ID
                </th>
              </tr>
            </thead>
            <tbody>
              {paymentInfo.map((info) => (
                <tr key={info._id}>
                  <td className="border border-slate-300 px-4 py-2">
                    {info.name}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    {info.college}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    {info.batch}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    {info.fbIdName}
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    <a href={info.fbIdLink}>{info.fbIdLink}</a>
                  </td>
                  <td className="border border-slate-300 px-4 py-2">
                    <a href={info.courseName}>{info.courseName}</a>
                  </td>
                  <td className="border border-slate-300 px-4 py-2 bg-green-200">
                    {info.transactionId}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No payment information available.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentCompleted;
