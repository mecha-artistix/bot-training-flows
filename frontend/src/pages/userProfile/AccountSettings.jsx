import { useState, useEffect } from 'react';
// import useScript, { fetchCountriesList } from '../../utils/useScript';
import Coutries from '../../assets/data/countries.json';
import { useAuth } from '../../context/AuthContext';
import { getUser, updateUser } from './fetchUser';
import { formatDate } from '../../utils/formatDate';

function AccountSettings() {
  const { user } = useAuth();
  const [countriesList, setCountriesList] = useState([]);
  const [values, setValues] = useState({
    image: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: '',
    email: '',
    phone: '',
    address: '',
    country: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await updateUser(user.userId, values);
  };
  useEffect(() => {
    async function getUserData(id) {
      const user = await getUser(id);
      console.log(user);
      setValues((values) => {
        const vals = { ...values, ...user, dateOfBirth: formatDate(user.dateOfBirth) };
        return vals;
      });
      console.log(values);
      // setValues({
      //   image: user.image || '',
      //   firstName: user.firstName || '',
      //   lastName: user.lastName || '',
      //   dateOfBirth: user.dateOfBirth || '',
      //   gender: user.gender || '',
      //   email: user.email || '',
      //   phone: user.phone || '',
      //   address: user.address || '',
      //   country: user.country || '',
      // });
    }
    getUserData(user.userId);
  }, [user]);

  return (
    <div className="flex flex-col space-y-10">
      <form onSubmit={handleSubmit} className="profile_form flex flex-col space-y-10">
        <div className="flex flex-col space-y-5">
          <h2 className="text-3xl font-semibold">Basic Information</h2>
          <div className="form-field">
            <label htmlFor="profilePicture">Profile Picture</label>
            <span>Add a profile picture to personalize your account</span>
            <input onChange={handleChange} type="file" accept="image/*" className="flex-1 text-right" />
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
            <span className="icon-span">pen</span>
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
            <span className="icon-span">pen</span>
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
            <span className="icon-span">pen</span>
          </div>
          <div className="form-field">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={values.gender} onChange={handleChange} placeholder="Date Of Birth">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="she_male">She Male</option>
            </select>
            <span className="flex-1 ml-auto text-right">pen</span>
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
            <span className="icon-span">pen</span>
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
            <span className="icon-span">pen</span>
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
            <span className="icon-span">pen</span>
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
            <span className="icon-span">pen</span>
          </div>
        </div>

        {/* SUBMIT */}

        <input type="submit" className="cwu_form_btn w-fit  self-end" value="Update and Next" />
      </form>
    </div>
  );
}

export default AccountSettings;
