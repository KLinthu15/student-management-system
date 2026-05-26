
import { useEffect, useState } from "react";
import axios from "axios";
import {
Building2,
Mail,
Phone,
MapPin,
Users,
Bell,
Save,
Loader2,
Settings,
} from "lucide-react";

const API_URL = "http://localhost:5001/api/settings";

export default function SettingsPage() {
const [loading, setLoading] = useState(false);
const [fetching, setFetching] = useState(true);

const [settings, setSettings] = useState({
institution_name: "",
institution_email: "",
institution_phone: "",
institution_address: "",
student_id_prefix: "STU",
email_notifications: true,


  // Admin Details
  admin_name: "",
  admin_email: "",
  admin_phone: "",
  admin_role: "Administrator",
  admin_avatar: "",

});

useEffect(() => {
fetchSettings();
}, []);

const fetchSettings = async () => {
try {
const res = await axios.get(API_URL);

  setSettings((prev) => ({
    ...prev,
    ...res.data,
  }));
} catch (err) {
  console.error(err);
} finally {
  setFetching(false);
}

};

const handleChange = (e) => {
const { name, value, checked, type } = e.target;

setSettings((prev) => ({
  ...prev,
  [name]: type === "checkbox" ? checked : value,
}));

};

const saveSettings = async () => {
try {
setLoading(true);

  await axios.put(API_URL, settings);

  alert("Settings Updated Successfully");
} catch (err) {
  console.error(err);
  alert("Failed To Update Settings");
} finally {
  setLoading(false);
}
};
if (fetching) {
return ( <div className="h-screen flex items-center justify-center"> <Loader2
       className="animate-spin text-blue-600"
       size={40}
     /> </div>
);
}
return ( <div className="min-h-screen bg-gray-50">

  {/* Header */}
  <div className="bg-white border-b">

    <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

      <div className="flex items-center gap-3">
        <div className="p-2 bg-blue-100 rounded-xl">
          <Settings
            size={22}
            className="text-blue-600"
          />
        </div>

        <div>
          <h1 className="text-2xl font-bold">
            Admin Settings
          </h1>

          <p className="text-gray-500 text-sm">
            Manage institution preferences
          </p>
        </div>
      </div>

      <button
        onClick={saveSettings}
        disabled={loading}
        className="bg-black text-white px-5 py-2.5 rounded-xl flex items-center gap-2 hover:opacity-90"
      >
        {loading ? (
          <>
            <Loader2
              size={16}
              className="animate-spin"
            />
            Saving...
          </>
        ) : (
          <>
            <Save size={16} />
            Save Changes
          </>
        )}
      </button>
      
    </div>

  </div>

  <div className="max-w-5xl mx-auto p-6">

    {/* General Section */}
    <div className="bg-white border rounded-2xl p-6 mb-6">

      <h2 className="font-semibold text-lg mb-5">
        Institution Information
      </h2>

      <div className="grid md:grid-cols-2 gap-5">

        <div>
          <label className="text-sm font-medium mb-2 block">
            Institution Name
          </label>

          <div className="relative">
            <Building2
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              name="institution_name"
              value={settings.institution_name}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Email Address
          </label>

          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="email"
              name="institution_email"
              value={settings.institution_email}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Phone Number
          </label>

          <div className="relative">
            <Phone
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              name="institution_phone"
              value={settings.institution_phone}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-2 block">
            Student ID Prefix
          </label>

          <div className="relative">
            <Users
              size={18}
              className="absolute left-3 top-3.5 text-gray-400"
            />

            <input
              type="text"
              name="student_id_prefix"
              value={settings.student_id_prefix}
              onChange={handleChange}
              className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

      </div>

      <div className="mt-5">
        <label className="text-sm font-medium mb-2 block">
          Institution Address
        </label>

        <div className="relative">
          <MapPin
            size={18}
            className="absolute left-3 top-3.5 text-gray-400"
          />

          <textarea
            rows={4}
            name="institution_address"
            value={settings.institution_address}
            onChange={handleChange}
            className="w-full border rounded-xl p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

    </div>

    {/* Notifications Section */}
    <div className="bg-white border rounded-2xl p-6">

      <h2 className="font-semibold text-lg mb-5">
        Notifications
      </h2>

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-medium">
            Email Notifications
          </h3>

          <p className="text-sm text-gray-500">
            Receive updates and alerts by email
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">

          <input
            type="checkbox"
            name="email_notifications"
            checked={settings.email_notifications}
            onChange={handleChange}
            className="sr-only peer"
          />

          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:left-[2px] after:top-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full">
          </div>

        </label>

      </div>

    </div>



    {/* Notifications Section */}
    <div className="bg-white border rounded-2xl p-6">

      <div className="flex items-center justify-between">

        <div>
          <h3 className="font-medium">
            SMS Notifications
          </h3>

          <p className="text-sm text-gray-500">
            Receive updates and alerts by sms
          </p>
        </div>

        <label className="relative inline-flex items-center cursor-pointer">

          <input
            type="checkbox"
            name="sms_notifications"
            checked={settings.sms_notifications}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-300 rounded-full peer peer-checked:bg-blue-600 after:absolute after:left-[2px] after:top-[2px] after:bg-white after:h-5 after:w-5 after:rounded-full after:transition-all peer-checked:after:translate-x-full">
          </div>

        </label>

      </div>

    </div>

  </div>

  






</div>

);
}
