import { useState, useEffect } from 'react';
// import useScript, { fetchCountriesList } from '../../utils/useScript';
import Coutries from '../../assets/data/countries.json';
import { useAuth } from '../../context/AuthContext';
import { getUser, updateUser, updatePassword } from './fetchUser';
import { formatDate } from '../../utils/formatDate';

function SecuritySettings() {
  const { user } = useAuth();
  const [values, setValues] = useState({
    passwordCurrent: '',
    password: '',
    passwordConfirm: '',
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(values);
    await updatePassword(values);
  };

  return (
    <div className="flex flex-col space-y-10">
      <form onSubmit={handleSubmit} className="profile_form flex flex-col space-y-10">
        <div className="flex flex-col space-y-5">
          <h2 className="text-3xl font-semibold">Update Password</h2>
          {/* UPDATE PASSWORD */}
          <div className="form-field">
            <label htmlFor="passwordCurrent">Current Password</label>
            <input
              type="password"
              id="passwordCurrent"
              name="passwordCurrent"
              value={values.passwordCurrent}
              onChange={handleChange}
            />
            <span className="icon-span">pen</span>
          </div>

          <div className="form-field">
            <label htmlFor="password">New Password</label>
            <input type="password" id="password" name="password" value={values.password} onChange={handleChange} />
            <span className="icon-span">pen</span>
          </div>

          <div className="form-field">
            <label htmlFor="passwordConfirm">Confirm New Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              value={values.passwordConfirm}
              onChange={handleChange}
            />
            <span className="icon-span">pen</span>
          </div>
        </div>
        {/* RECOVERY OPTIONS */}
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

export default SecuritySettings;
