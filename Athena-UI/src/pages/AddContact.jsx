import React, { useState, useEffect } from "react";

const AddContact = () => {
  const [showForm, setShowForm] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    walletAddress: "",
    email: "",
  });

  // Default Contacts
  const defaultContacts = [
    {
      name: "Alice Doe",
      walletAddress: "0x1234...abcd",
      email: "alice@example.com",
    },
    {
      name: "Bob Smith",
      walletAddress: "0x5678...efgh",
      email: "bob@example.com",
    },
    {
      name: "Charlie Brown",
      walletAddress: "0x9101...ijkl",
      email: "charlie@example.com",
    },
    {
      name: "Diana Prince",
      walletAddress: "0x1122...mnop",
      email: "diana@example.com",
    },
    {
      name: "Eve Adams",
      walletAddress: "0x3344...qrst",
      email: "eve@example.com",
    },
  ];

  // Load contacts from localStorage or set defaults
  useEffect(() => {
    const storedContacts = JSON.parse(localStorage.getItem("contacts"));
    if (storedContacts) {
      setContacts(storedContacts);
    } else {
      setContacts(defaultContacts);
      localStorage.setItem("contacts", JSON.stringify(defaultContacts));
    }
  }, []);

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Add Contact
  const handleAddContact = (e) => {
    e.preventDefault();
    if (formData.name && formData.walletAddress && formData.email) {
      const updatedContacts = [...contacts, formData];
      setContacts(updatedContacts);
      localStorage.setItem("contacts", JSON.stringify(updatedContacts));
      setFormData({ name: "", walletAddress: "", email: "" });
      setShowForm(false);
    }
  };

  return (
    <div className="p-6 bg-gradient-to-b from-[#020d29] to-[#011219] min-h-screen text-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Portfolio</h1>
      </div>
      <button
        className="flex items-center px-4 w-full text-center justify-center py-3 mb-4 border-green-600 border-2 text-white rounded-md"
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Back to Contacts" : "Add Contact"}
      </button>

      {/* Add Contact Form */}
      {showForm ? (
        <form
          className="p-6 bg-[#1C2C3A] rounded-lg border border-gray-700"
          onSubmit={handleAddContact}
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Contact Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter contact name"
              className="w-full px-4 py-2 rounded-lg bg-[#020d29] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              name="walletAddress"
              value={formData.walletAddress}
              onChange={handleChange}
              placeholder="Enter wallet address"
              className="w-full px-4 py-2 rounded-lg bg-[#020d29] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Contact Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter contact email"
              className="w-full px-4 py-2 rounded-lg bg-[#020d29] border border-gray-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold"
          >
            Save
          </button>
        </form>
      ) : (
        // Contact List
        <div className="space-y-4">
          {contacts.length === 0 ? (
            <p className="text-gray-400 text-center">No contacts added yet.</p>
          ) : (
            contacts.map((contact, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-[#1C2C3A] p-4 rounded-lg border border-gray-700"
              >
                <div>
                  <p className="text-lg font-bold text-white">{contact.name}</p>
                  <p className="text-gray-400 text-sm">
                    {`${contact.walletAddress.slice(
                      0,
                      9
                    )}...${contact.walletAddress.slice(-6)}`}
                  </p>
                  <p className="text-gray-400 text-sm">{contact.email}</p>
                </div>
                {/* <div className="flex space-x-4">
                  <button className="px-4 py-2 bg-green-500 text-white rounded-full">
                    Send
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-full">
                    Request
                  </button>
                </div> */}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default AddContact;
