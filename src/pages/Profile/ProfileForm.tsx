import React from "react";
import InputField from "@/components/InputField"; // Reusing the InputField component

interface ProfileFormProps {
  formData: {
    firstName: string;
    lastName: string;
    middlename: string;
    mobileNumber: string;
    bio: string;
    taxIdNumber: string;
    taxIdCountry: string;
    residentialAddress: string;
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
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
  );
};
