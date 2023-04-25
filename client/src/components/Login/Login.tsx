import React, { useState } from 'react';
import { authenticate } from '../../services/auth';
import { useNavigate } from 'react-router';
interface Props {
  title: string;
  logIn: () => void;
}

interface InputField {
  label: string;
  type: string;
  name: string;
}

interface FormField extends InputField {
  value: string;
}

enum FormMode {
  SignIn,
  SignUp,
}

const LoginForm: React.FC<Props> = ({ title }) => {
  const [formMode, setFormMode] = useState(FormMode.SignIn);
  const [formFields, setFormFields] = useState<FormField[]>([
    { label: 'Username', type: 'text', name: 'username', value: '' },
    { label: 'Password', type: 'password', name: 'password', value: '' },
    { label: 'Email', type: 'email', name: 'email', value: '' },
    { label: 'First Name', type: 'text', name: 'firstName', value: '' },
    { label: 'Last Name', type: 'text', name: 'lastName', value: '' },
  ]);
  const navigate = useNavigate()
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const endpoint = formMode === FormMode.SignIn ? '/signin' : '/user';
      const data = formFields.reduce(
        (data, field) => ({ ...data, [field.name]: field.value }),
        {}
      );

      const response = await authenticate(endpoint, data);
      console.log(response);


      // Handle successful login or registration
      if (response) {
        navigate('/dashboard')
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      console.error('Unhandled error: ', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields(fields =>
      fields.map(field => (field.name === name ? { ...field, value } : field))
    );
  };

  const toggleFormMode = () => {
    setFormMode(mode =>
      mode === FormMode.SignIn ? FormMode.SignUp : FormMode.SignIn
    );
  };

  const signInInputs: InputField[] = [
    { label: 'Username', type: 'text', name: 'username' },
    { label: 'Password', type: 'password', name: 'password' },
  ];

  const signUpInputs: InputField[] = [
    ...formFields.slice(0, 3),
    ...formFields.slice(3).map(field => ({
      ...field,
      value: '',
    })),
  ];

  const inputs = formMode === FormMode.SignIn ? signInInputs : signUpInputs;
  return (
    <div className="font-sans max-w-md mx-auto rounded-lg overflow-hidden bg-opacity-75 backdrop-filter backdrop-blur-md backdrop-saturate-150" style={{ fontFamily: 'Roboto', backgroundImage: 'linear-gradient(to bottom right, #050505, #cccccc)' }}>
      <div className="px-4 py-2 shadow-md backdrop-shadow-md rounded-lg">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          {inputs.map(input => (
            <div key={input.name} className="mb-4">
              <label htmlFor={input.name} className="block text-white font-bold mb-2">
                {input.label}
              </label>
              <input
                type={input.type}
                name={input.name}
                id={input.name}
                className="bg-white border border-white rounded-md py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline backdrop-blur-md backdrop-saturate-150"
                value={formFields.find(field => field.name === input.name)?.value}
                onChange={handleInputChange}
                required
                placeholder=" "

              />
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded backdrop-blur-md backdrop-saturate-150"
          >
            {formMode === FormMode.SignIn ? 'Sign In' : 'Sign Up'}
          </button>
          <div className="mt-4">
            {formMode === FormMode.SignIn ? (
              <p>
                Not registered yet?{' '}
                <button
                  type="button"
                  className="text-blue-500 hover:underline focus:outline-none backdrop-blur-md backdrop-saturate-150"
                  onClick={toggleFormMode}
                >
                  Create an account
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button
                  type="button"
                  className="text-blue-500 hover:underline focus:outline-none backdrop-blur-md backdrop-saturate-150"
                  onClick={toggleFormMode}
                >
                  Sign in
                </button>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
export default LoginForm