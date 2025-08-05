import React from "react";
import InputField from "@/components/InputField"; // Reusing the InputField component

interface ProfileFormProps {
  formData: {
    firstName: string;
    lastName: string;
    middlename: string;
    mobileNumber: string;
    bio: string;

    school: string;
    degree: string;
    fieldOfStudy: string;
    researchField: string;
  };
  handleChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({
  formData,
  handleChange,
  handleSubmit,
}) => {
  return (
    <div className="w-full">
      <form onSubmit={handleSubmit} className="w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          <InputField
            label="First Name"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
          />
          <InputField
            label="Last Name"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
          />
          <div className="col-span-1 md:col-span-2">
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              placeholder="Tell us about yourself..."
            />
          </div>
          <InputField
            label="Middle Name"
            id="middlename"
            name="middlename"
            value={formData.middlename}
            onChange={handleChange}
          />
          <InputField
            label="Mobile Number"
            id="mobileNumber"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </div>

        <InputField
          label="Bio"
          id="bio"
          name="bio"
          isTextArea
          value={formData.bio}
          onChange={handleChange}
        />

        {/* Education Section */}
        <h2 className="text-lg font-semibold mt-6">Education</h2>
        <InputField
          label="School"
          id="school"
          name="school"
          value={formData.school}
          onChange={handleChange}
        />
        <InputField
          label="Degree"
          id="degree"
          name="degree"
          value={formData.degree}
          onChange={handleChange}
          type="select"
          options={[
            { value: "", label: "Select Degree" },
            { value: "Associate", label: "Associate" },
            { value: "Bachelor", label: "Bachelor" },
            { value: "BSc", label: "BSc" },
            { value: "BA", label: "BA" },
            { value: "Master", label: "Master" },
            { value: "MSc", label: "MSc" },
            { value: "MA", label: "MA" },
            { value: "MBA", label: "MBA" },
            { value: "PhD", label: "PhD" },
            { value: "MD", label: "MD" },
            { value: "JD", label: "JD" },
            { value: "Diploma", label: "Diploma" },
            { value: "Certificate", label: "Certificate" },
          ]}
        />
        <InputField
          label="Field of Study"
          id="fieldOfStudy"
          name="fieldOfStudy"
          value={formData.fieldOfStudy}
          onChange={handleChange}
        />
        <InputField
          label="Research Field"
          id="researchField"
          name="researchField"
          value={formData.researchField}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="mt-6 w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Save
        </button>
      </form>
    </div>
  );
};
