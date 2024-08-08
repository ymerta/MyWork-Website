
import React, { ChangeEvent } from 'react';

interface ProfilePictureInputProps {
  onFileChange: (file: File | null) => void;
}

const ProfilePictureInput: React.FC<ProfilePictureInputProps> = ({
  onFileChange,
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onFileChange(e.target.files[0]);
    } else {
      onFileChange(null);
    }
  };

  return (
    <div className="form-group">
      <input
        type="file"
        className="form-control"
        id="profilePicture"
        onChange={handleChange}
      />
    </div>
  );
};

export default ProfilePictureInput;
