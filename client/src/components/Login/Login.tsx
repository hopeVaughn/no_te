import React, { useState } from 'react';
import { authenticate } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import apiClient from '../../services/apiClient';
import { FormData } from '../../types';
// Prop type definition for the LoginForm component
interface Props {
  handleLogin: (response: any) => void;
}

// Interface for the input fields in the form
interface InputField {
  label: string;
  type: string;
  name: string;
}


// Interface for the form fields, extending InputField and adding value
interface FormField extends InputField {
  value: string;
}

// Enum for the form modes (SignIn, SignUp)
enum FormMode {
  SignIn,
  SignUp,
}

const LoginForm: React.FC<Props> = ({ handleLogin }) => {
  const [formMode, setFormMode] = useState(FormMode.SignIn);
  const [formFields, setFormFields] = useState<FormField[]>([
    { label: 'Username', type: 'text', name: 'username', value: '' },
    { label: 'Password', type: 'password', name: 'password', value: '' },
    { label: 'Email', type: 'email', name: 'email', value: '' },
    { label: 'First Name', type: 'text', name: 'firstName', value: '' },
    { label: 'Last Name', type: 'text', name: 'lastName', value: '' },
  ]);
  const navigate = useNavigate();

  // Form submission handler
  // Form submission handler
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const data: FormData = formFields.reduce<FormData>(
        (data, field) => ({ ...data, [field.name]: field.value }),
        { username: '', password: '', email: '', firstName: '', lastName: '' }
      );

      // Remove optional fields if they are undefined
      const filteredData: Record<string, string> = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );

      if (formMode === FormMode.SignUp) {
        const createUserResponse = await apiClient.post('/user', filteredData);

        if (createUserResponse.status === 200) {
          // User created successfully, now sign in
          const signInData: Record<string, string> = {
            username: data.username,
            password: data.password,
            email: data.email || '',
            firstName: data.firstName || '',
            lastName: data.lastName || '',
          };

          const response = await authenticate('/signin', signInData);

          if (response) {
            handleLogin(response);
            navigate('/dashboard');
          }
        }
      } else {
        // Form mode is FormMode.SignIn
        const response = await authenticate('/signin', filteredData);

        if (response) {
          handleLogin(response);
          navigate('/dashboard');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      console.error('Unhandled error: ', error);
    }
  };



  // Handler for change in input field
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields(fields =>
      fields.map(field => (field.name === name ? { ...field, value } : field))
    );
  };

  // Function to toggle between SignIn and SignUp modes
  const toggleFormMode = () => {
    setFormMode(mode =>
      mode === FormMode.SignIn ? FormMode.SignUp : FormMode.SignIn
    );
  };

  // Fields for SignUp mode
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

  // Decide which set of fields to display based on form mode
  const inputs = formMode === FormMode.SignIn ? signInInputs : signUpInputs;
  return (
    <div className="font-sans max-w-md mx-auto rounded-lg overflow-hidden bg-opacity-75 backdrop-filter backdrop-blur-md backdrop-saturate-150" style={{ fontFamily: 'Roboto', backgroundImage: 'linear-gradient(to bottom right, #050505, #cccccc)' }}>
      <div className="px-4 py-2 shadow-md backdrop-shadow-md rounded-lg">
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
                className="bg-white border border-white rounded-md py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline backdrop-blur-md backdrop-saturate-150"
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