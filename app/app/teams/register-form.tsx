import { ApiRouteRequestDataTeamCreate } from '@/app/api/teams/create/route';
import ErrorTemplate from '@/components/ui-elements/error-template';
import SuccessTemplate from '@/components/ui-elements/success-template';
import InputGroup from '@/components/ui/input-group';
import { handleCatchBlock } from '@/functions/common';
import axios from 'axios';
import { FormEvent, useState } from 'react'

const RegisterForm = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<boolean>(false)

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>('');

    async function handleFormSubmit(event: FormEvent) {

        event.preventDefault();

        setIsLoading(true);
        setError(null);

        try {

            if (!email || !name || !password) {
                throw new Error("Please fill required fields");
            }

            const requestData: ApiRouteRequestDataTeamCreate = { name, email, password }
            await axios.post('/api/teams/create', requestData);

            setSuccess(true);

            setEmail("");
            setPassword("");
            setName("");

            setTimeout(() => {
                setSuccess(false);
            }, 3000);


        } catch (err) {
            const message = handleCatchBlock(err);
            setError(message);
        }

        setIsLoading(false);
    }

    return (
        <div>
            <form
                className='bg-background py-5 px-7 space-y-6 rounded-2xl max-w-[500px] mx-auto'
                onSubmit={handleFormSubmit}
            >
                <InputGroup
                    label='Email address'
                    name='email'
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder='Email address'
                    type='email'
                    value={email}
                    required
                />

                <InputGroup
                    label='Your name'
                    name='name'
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Your name'
                    type='text'
                    value={name}
                    required
                />

                <InputGroup
                    label='Password'
                    name='password'
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                    type={showPassword ? "text" : "password"}
                    value={password}
                    required
                />

                <div
                    className='flex items-center gap-3'
                >
                    <input
                        type='checkbox'
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                    />
                    <p>Show password</p>
                </div>

                <button
                    className='py-4 px-6 rounded-2xl bg-theme-primary text-white cursor-pointer'
                >
                    {isLoading ? "Loading..." : "Add User"}
                </button>

                {
                    error && (
                        <ErrorTemplate
                            error={error}
                        />
                    )
                }

                {
                    success && (
                        <SuccessTemplate
                            message='Team member added successfuly'
                        />
                    )
                }

            </form>
        </div>
    )
}

export default RegisterForm