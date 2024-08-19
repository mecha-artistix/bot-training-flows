import { useState, useEffect, useRef } from 'react';
import Coutries from '../../assets/data/countries.json';
import { useAuth } from '../../context/AuthContext';
import { getUser, updateUser } from './fetchUser';
import { formatDate } from '../../utils/formatDate';
import { useNavigate } from 'react-router-dom';
import EditIcon from '../../assets/icons/EditIcon';
function AccountSettings() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [countriesList, setCountriesList] = useState([]);
  const [preview, setPreview] = useState();
  const [fileName, setFileName] = useState('No file chosen');
  const [file, setFile] = useState(null);
  const [values, setValues] = useState({
    // photo: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    country: '',
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    async function getUserData(id) {
      const user = await getUser(id);

      setValues({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        dateOfBirth: formatDate(user.dateOfBirth) || '',
        gender: user.gender || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        country: user.country || '',
      });

      setPreview(`${import.meta.env.VITE_NODE_BASE_API}public/img/users/${user.photo}`);
    }
    getUserData(user.userId);
  }, []);

  const handleFileChange = (e) => {
    // handleChange(e);
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      setFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setFileName('No file chosen');
      // setPreview(values.photo);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // Append text fields
    Object.keys(values).forEach((key) => {
      formData.append(key, values[key]);
    });
    // Append the file if it exists
    if (file) {
      formData.append('photo', file);
    }
    console.log('formData', formData);
    // Send form data to backend
    await updateUser(user.userId, formData);
    navigate('/user-profile/security-settings');
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col space-y-10">
      <form onSubmit={handleSubmit} className="profile_form flex flex-col space-y-10">
        <div className="flex flex-col space-y-5">
          <h2 className="text-3xl font-semibold">Basic Information</h2>

          <div className="form-field">
            <label htmlFor="profilePicture">Profile Picture</label>
            <span>Add a profile picture to personalize your account</span>
            <div className="flex flex-col items-center">
              <img src={preview} alt="profile-photo" className="size-16 border rounded-full" />
              <button
                type="button"
                onClick={handleButtonClick}
                className="border-b border-secondry hover:border-black hover:text-black text-secondry"
              >
                Upload a file
              </button>
              <input
                ref={fileInputRef}
                onChange={handleFileChange}
                id="photo"
                name="photo"
                type="file"
                accept="image/*"
                className="hidden"
              />
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="firstName">First Name</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={values.firstName}
              onChange={handleChange}
              placeholder="First Name"
            />
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Last Name</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={values.lastName}
              onChange={handleChange}
              placeholder="Last Name"
            />
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="dateOfBirth">Date Of Birth</label>
            <input
              type="date"
              id="dateOfBirth"
              name="dateOfBirth"
              value={values.dateOfBirth}
              onChange={handleChange}
              placeholder="Date Of Birth"
            />
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>
          <div className="form-field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={values.gender} onChange={handleChange} placeholder="Date Of Birth">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="she_male">She Male</option>
            </select>
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>
        </div>
        {/* CONTACT INFORMATION */}
        <div className="flex flex-col space-y-5">
          <h2 className="text-3xl font-semibold">Contact Information</h2>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="type your email"
            />
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <input
              type="phone"
              id="phone"
              name="phone"
              value={values.phone}
              onChange={handleChange}
              placeholder="type your Phone number"
            />
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={values.address}
              onChange={handleChange}
              placeholder="type your address"
            />
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>

          <div className="form-field">
            <label htmlFor="country">country</label>
            <select
              id="country"
              name="country"
              value={values.country}
              onChange={handleChange}
              placeholder="Select your country"
            >
              {Coutries.map((country) => (
                <option key={country.iso} value={country.name}>
                  {country.flag}
                  {country.name}
                </option>
              ))}
            </select>
            <span className="icon-span">
              <EditIcon />
            </span>
          </div>
        </div>

        {/* SUBMIT */}

        <input type="submit" className="cwu_form_btn w-fit  self-end" value="Update and Next" />
      </form>
    </div>
  );
}

export default AccountSettings;
