import React, { useState } from "react";

const formFields = [
  { id: "name", label: "Name", type: "text", required: true },
  { id: "college", label: "College", type: "text", required: true },
  { id: "batch", label: "Batch", type: "text", required: true },
  { id: "fbIdName", label: "Facebook ID Name", type: "text", required: true },
  {
    id: "fbIdLink",
    label: "Facebook ID Link ",
    type: "text",
    required: true,
  },
  {
    id: "transactionId",
    label: "Transaction ID ***",
    type: "text",
    required: true,
  },
  {
    id: "courseName",
    label: "Select Course",
    type: "select",
    required: true,
  },
  {
    id: "coupon",
    label: "Coupon",
    type: "text",
    required: false,
  },
];

const courses = ["শ্বসন ও শ্বাসক্রিয়া", "Other"];

const Payment = () => {
  const [formData, setFormData] = useState({
    name: "",
    college: "",
    batch: "",
    fbIdName: "",
    fbIdLink: "",
    transactionId: "",
    courseName: "",
    coupon: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://biomate-server-49d3.vercel.app/api/paymentinfo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Payment information saved successfully!");
      } else {
        const errorData = await response.json();
        alert("Error: " + errorData.error);
      }
    } catch (error) {
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="text-slate-800 flex flex-col items-center justify-center w-full h-full">
      <h2 className="py-5 text-red-500 font-bold text-2xl">
        Payment & Registration
      </h2>
      <div className="flex sm:flex-row flex-col ">
        <div className="flex items-center mx-10">
          <p className="max-w-sm">
            প্রিয় শিক্ষার্থী, কোর্সে ভর্তি হওয়ার জন্য 01518711007 এই নাম্বারে
            bKash এর মাধ্যমে সেন্ড মানি করে Transaction No. টি কপি করে উপযুক্ত
            বক্সে প্রদান করো। এছাড়া অন্যান্য প্রয়োজনীয় তথ্য প্রদান করে Submit
            করো।পরবর্তী Page এ প্রাইভেট গ্রুপের লিংক দেওয়া থাকবে সেখানে জয়েনিং
            রিকয়েস্ট পাঠাও।আমাদের Team দ্রুততম সময়ে,তোমাকে Approve করে
            নিবে।যেকোনো প্রয়োজনে 01300740933 নাম্বারে কল করতে পারো। ধন্যবাদ
          </p>
        </div>
        <form
          onSubmit={handleSubmit}
          className="border mx-4 px-2 py-5 my-5 rounded-md w-[400px] h-auto"
        >
          {formFields.map(({ id, label, type, required }) => (
            <div key={id} className="mb-4">
              <label htmlFor={id}>{label}</label>
              {type === "select" ? (
                <select
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required={required}
                  className="block w-full mt-1 bg-gray-100 rounded-sm px-2 py-1"
                >
                  <option value="" disabled>
                    Select a course
                  </option>
                  {courses.map((course) => (
                    <option key={course} value={course}>
                      {course}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={type}
                  id={id}
                  name={id}
                  value={formData[id]}
                  onChange={handleChange}
                  required={required}
                  className="block w-full mt-1 bg-gray-100 rounded-sm px-2 py-1"
                />
              )}
            </div>
          ))}
          <button
            type="submit"
            className="mt-4 border w-full rounded-md bg-slate-900 text-gray-100 hover:bg-green-500 hover:text-slate-900 font-bold py-1"
          >
            Submit
          </button>
          <p className="text-slate-500 pt-4 text-sm">
            N.B: Once you submit with correct transaction id, your request to
            enroll into the course will be manually approved soon. Thank You
          </p>
        </form>
      </div>
    </div>
  );
};

export default Payment;
