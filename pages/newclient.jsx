import { NavLink } from '../components/NavLink.jsx';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

// form validation
const clientSchema = Yup.object().shape({
    firstName: Yup.string().required('*'),
    lastName: Yup.string().required('*'),
    middleInitial: Yup.string().notRequired().when('middleInitial', {is:(value) => value?.length, then:(rule) => rule.length(1)}),
    dateOfBirth: Yup.date().required('*').nullable().transform(v => (v instanceof Date && !isNaN(v) ? v : null)),
    gender: Yup.string().notRequired(),
    race: Yup.string().notRequired(),
    postalCode: Yup.string().matches(/^\d{5}(?:[- ]?\d{4})?$/, {excludeEmptyString: true, message: '* wrong format'}),
    familyId: Yup.string().notRequired()
},
// add cyclic dependencies for requiring itself
[['middleInitial', 'middleInitial'],['postalCode', 'postalCode']]);

export default function newclient() {

    const { register, handleSubmit, formState } = useForm({
        resolver: yupResolver(clientSchema)
    });

    const {errors} = formState;

    const submitForm = (data) => {
        console.log(data)
    }

    return (
        <div>
            <h1 className="py-8 font-bold text-white-700 text-center text-2xl">New Client Form</h1>
            <form onSubmit={handleSubmit(submitForm)} className="px-40 py-4">
                <div className="shadow overflow-hidden sm:rounded-md">
                    <div className="px-9 py-5 bg-white sm:p-6">
                        <div className="p-12 grid grid-cols-9 gap-12">
                        {/* First Name */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">First name <span className="font-bold text-orange-700">{errors.firstName?.message}</span></label>
                            <input type="text" name="firstName" {...register('firstName')} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Last Name */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Last name <span className="font-bold text-orange-700">{errors.lastName?.message}</span></label>
                            <input type="text" name="lastName" {...register('lastName')} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Middle Initial */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Middle Initial</label>
                            <input type="text" name="middleInitial" {...register('middleInitial')} className="flex-1 w-1/3 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Date of Birth */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Date of Birth <span className="font-bold text-orange-700">{errors.dateOfBirth?.message}</span></label>
                            <input type="date" name="dateOfBirth" {...register('dateOfBirth')} placeholder="date" className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none"></input>
                        </div>
                        {/* Gender */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Gender</label>
                            <select name="gender" {...register('gender')} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                                <option defaultValue value="">(Optional)</option>
                                <option>F</option>
                                <option>M</option>
                                <option>X</option>
                            </select>
                        </div>
                        {/* Race */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Race</label>
                            <select name="race" {...register('race')} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none">
                                <option defaultValue value="">(Optional)</option>
                                <option>American Indian or Alaska Native</option>
                                <option>Asian</option>
                                <option>Black or African American</option>
                                <option>Native Hawaiian or Other Pacific Islander</option>
                                <option>Hispanic or Latino</option>
                                <option>White</option>
                                <option>Other</option>
                            </select>
                        </div>
                        {/* Zip Code */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Postal code <span className="font-bold text-orange-700">{errors.postalCode?.message}</span></label>
                            <input type="text" name="postalCode" {...register('postalCode')} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        {/* Family */}
                        <div className="col-span-9 sm:col-span-3">
                            <label className="block font-bold text-gray-700">Family Id</label>
                            <input type="text" name="familyId" {...register('familyId')} className="flex-1 w-3/4 py-2 text-center border-b-2 border-gray-400 focus:border-green-400 text-gray-600 placeholder-gray-400 outline-none" />
                        </div>
                        </div>
                    </div>
                    <div className="px-8 py-4 bg-gray-50 text-center space-x-8">
                        <button type="submit" className="inline-flex justify-center py-4 px-8 border border-transparent shadow-sm font-bold rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Save</button>
                        <NavLink href= "/checkin" className="inline-flex justify-center py-4 px-8 border border-transparent shadow-sm font-bold rounded-md text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Back</NavLink>
                    </div>
                </div>
            </form>
        </div>
    )
}