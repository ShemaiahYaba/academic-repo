import { useState, ChangeEvent, FormEvent } from 'react';
import { back } from '../constants/images';


// Define a type for form data
interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
}

// Reusable Input Component
const InputField = ({
  label,
  id,
  type,
  name,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  id: string;
  type: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}) => (
  <div className="mb-4">
    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor={id}>
      {label}
    </label>
    <input
      className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
      id={id}
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  </div>
);

function ContactForm() {
  // Initial state for form data
  const initialFormData: FormData = {
    firstName: '',
    lastName: '',
    email: '',
    message: '',
  };

  const [formData, setFormData] = useState<FormData>(initialFormData);

  // Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Backend integration: Submit form data to API
    console.log('Submitting form data:', formData);

    // Reset form after submission
    setFormData(initialFormData);
  };

  return (
    <div className="">
      <div className="bg-sky-50 shadow-md rounded p-5">
        <div className="">
          <button className="text-gray-500 hover:text-gray-700 focus:outline-none pb-3">
            <img src={back} className="h-4" alt="Go back" />
          </button>
          <h2 className="text-3xl left-12 font-bold text-gray-800 px-11 p-5">
            Fill the form
            <br /> to contact us
          </h2>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-3">
            <InputField
              label="First name"
              id="firstName"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <InputField
              label="Last name"
              id="lastName"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
            />
          </div>
          <div className="mb-6 p-3">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
              How can we help you?
            </label>
            <textarea
              className="appearance-none border border-gray-400 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              rows={5}
            />
          </div>
          <div className="flex items-center justify-between p-3">
            <button
              className="bg-black hover:bg-gray-700 text-white py-2 px-16 font-light rounded focus:outline-none"
              type="submit"
            >
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ContactForm;
